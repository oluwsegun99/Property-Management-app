import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from "bcrypt";
import { AdminSigninInput, AdminSignUpAfterInvite, AdminSignupInput, UserSigninInput, UserSignUpInput } from 'src/graphql';
import { validateAdminSignInDTO, validateAdminSignUpAfterInviteDTO, validateAdminSignUpDTO, validateSignInDTO, validateSignUpDTO } from 'src/common/validationFunctions/auth.validation';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private config: ConfigService,
    ) { }

    async signUp(dto: UserSignUpInput) {
        try {
            // Validate CreateSignUpDTO
            const errors: string[] = await validateSignUpDTO(dto);
            if (errors.length > 0) {
                const errorMessage = `Validation error: ${errors.join(', ')}`;
                throw new ForbiddenException(errorMessage);
            };

            const hash = await this.hashData(dto.password);

            const role = await this.prisma.role.findFirst({
                where: {
                    roleName: Role.Owner,
                },
            });

            if (!role) throw new ForbiddenException("Owner role not found");

            const userExists = await this.prisma.user.findFirst({
                where: {
                    email: dto.email,
                },
            });
            if (userExists) throw new ForbiddenException("Email already used");

            const code = Math.floor(1000 + Math.random() * 9000);
            const codeExpiry = new Date(Date.now() + 60 * 60 * 1000);

            const newUser = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    fullname: dto.fullname,
                    mobile: dto.mobile,
                    hash,
                    isDeveloper: dto.isDeveloper,
                    hasCompany: dto.hasCompany,
                    roleId: role.id,
                    code,
                    codeExpiry,
                    // verified: false,
                },
            });

            // await this.eventEmitter.emit("user.created", new UserCreatedEvent(newUser.id, newUser.email, newUser.fullname, code));
            // await this.logger.log("User successfully created...", newUser.email);

            const token = await this.getTokens(newUser.id, newUser.email);
            this.updateRtHash(newUser.id, token.refresh_token);
            return token;
        } catch (error) {
            console.error(error)
            throw error;
        };
    };

    async adminSignUp(dto: AdminSignupInput) {
        try {
            // Validate CreateSignUpDTO
            const errors: string[] = await validateAdminSignUpDTO(dto);
            if (errors.length > 0) {
                const errorMessage = `Validation error: ${errors.join(', ')}`;
                throw new ForbiddenException(errorMessage);
            };

            const hash = await this.hashData(dto.password);

            const adminExists = await this.prisma.admin.findFirst({
                where: {
                    email: dto.email,
                },
            });
            if (adminExists) throw new ForbiddenException("Email already used");

            //Check if super admin role exists
            const roleExists = await this.prisma.role.findFirst({
                where: {
                    roleName: Role.SuperAdmin,
                },
                select: {
                    id: true,
                    users: true,
                    admins: true,
                },
            });
            if (!roleExists) throw new ForbiddenException("Super admin role not found");

            if (roleExists.users.length > 0 || roleExists.admins.length > 0) throw new ForbiddenException("Super admin already exists");

            const newAdmin = await this.prisma.admin.create({
                data: {
                    fullname: dto.fullname,
                    email: dto.email,
                    mobile: dto.mobile,
                    hash: hash,
                    roleId: roleExists.id,
                },
            });

            const token = await this.getEmployeeTokens(newAdmin.id, newAdmin.email);
            this.updateEmployeeRtHash(newAdmin.id, token.refresh_token);
            return token;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async adminSignUpAfterInvite(dto: AdminSignUpAfterInvite) {
        try {
            // Validate
            const errors: string[] = await validateAdminSignUpAfterInviteDTO(dto);
            if (errors.length > 0) {
                const errorMessage = `Validation error: ${errors.join(', ')}`;
                throw new ForbiddenException(errorMessage);
            };

            //find invite
            const adminInvite = await this.prisma.adminInvite.findUnique({
                where: {
                    id: dto.inviteId,
                },
            });
            if (!adminInvite) throw new ForbiddenException("Access denied: This email needs to be invited first");

            const adminExists = await this.prisma.admin.findFirst({
                where: {
                    email: adminInvite.email,
                },
            });
            if (adminExists) throw new ForbiddenException("Email already used");

            const hash = await this.hashData(dto.password);

            const newAdmin = await this.prisma.admin.create({
                data: {
                    email: adminInvite.email,
                    fullname: adminInvite.fullname,
                    hash: hash,
                    mobile: adminInvite.mobile,
                    roleId: adminInvite.roleId,
                },
            });

            const token = await this.getEmployeeTokens(newAdmin.id, newAdmin.email);
            this.updateEmployeeRtHash(newAdmin.id, token.refresh_token);
            return token;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async signIn(dto: UserSigninInput) {
        try {
            // Validate CreateSignInDTO
            const errors: string[] = await validateSignInDTO(dto);
            if (errors.length > 0) {
                const errorMessage = `Validation error: ${errors.join(', ')}`;
                throw new ForbiddenException(errorMessage);
            };

            //find User
            const userExists = await this.prisma.user.findUnique({
                where: {
                    email: dto.email,
                },
            });
            if (!userExists) throw new UnauthorizedException("Incorrect email or password");

            //compare passwords
            const passwordMatches = await bcrypt.compare(dto.password, userExists.hash);
            if (!passwordMatches) throw new UnauthorizedException("Incorrect Email or Password");

            //generate tokens
            const token = await this.getTokens(userExists.id, userExists.email);
            this.updateRtHash(userExists.id, token.refresh_token);

            return {
                vetted: userExists.vetted,
                verified: userExists.verified,
                token
            };
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async adminSignIn(dto: AdminSigninInput) {
        try {
            // Validate AdminSignInDTO
            const errors: string[] = await validateAdminSignInDTO(dto);
            if (errors.length > 0) {
                const errorMessage = `Validation error: ${errors.join(', ')}`;
                throw new ForbiddenException(errorMessage);
            };

            const adminExists = await this.prisma.admin.findUnique({
                where: {
                    email: dto.email,
                },
            });
            if (!adminExists) throw new UnauthorizedException("Incorrect email or password");

            //compare passwords
            const passwordMatches = await bcrypt.compare(dto.password, adminExists.hash);
            if (!passwordMatches) throw new UnauthorizedException("Incorrect Email or Password");

            //2FA auth

            //generate tokens
            const token = await this.getEmployeeTokens(adminExists.id, adminExists.email);
            this.updateEmployeeRtHash(adminExists.id, token.refresh_token);
            return token;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async resendVerificationCode(userId: string) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (!user) throw new ForbiddenException("User not found");

            const isVerified = user.verified;
            if (isVerified === true) throw new ForbiddenException("User already verified");

            const code = Math.floor(1000 + Math.random() * 9000);
            const codeExpiry = new Date(Date.now() + 60 * 60 * 1000);

            await this.prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    code,
                    codeExpiry,
                },
            });

            // await this.eventEmitter.emit("user.created", new UserCreatedEvent(user.id, user.email, user.fullname, code));
            // await this.logger.log("Verification email resent...", user.email);

            return true;
        } catch (error) {
            console.error(error);
            throw error;
        };
    }

    async verification(userId: string, code: number) {
        try {
            if (!code) throw new ForbiddenException("Missing required fields");

            const date = new Date(Date.now());
            const threeMins = new Date(Date.now() + 3 * 60 * 1000);

            const user = await this.prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });

            if (!user) throw new ForbiddenException("User not found");

            const isVerified = user.verified;
            if (isVerified === true) throw new ForbiddenException("User already verified");

            //if time out has not finished
            if (user.verificationTimeOut && date.getTime() < user.verificationTimeOut.getTime()) throw new ForbiddenException("Verification Attempts maxed out");

            if (code !== user.code) {
                const updatedUser = await this.prisma.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        verificationAttempt: user.verificationAttempt + 1,
                    },
                });

                if (updatedUser.verificationAttempt >= 3) {
                    await this.prisma.user.update({
                        where: {
                            id: updatedUser.id,
                        },
                        data: {
                            verificationTimeOut: threeMins,
                            verificationAttempt: 0,
                        },
                    });

                    throw new ForbiddenException("Verification Attempts maxed out...try again in 10 minutes");
                };

                throw new ForbiddenException("Invalid Code");
            };

            if (date.getTime() > user.codeExpiry.getTime()) throw new ForbiddenException("Verification code is expired");

            await this.prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    codeExpiry: date,
                    verified: true,
                    verificationTimeOut: null,
                    verificationAttempt: null,
                },
            });

            return true;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async forgotPassword() { }

    async resetPassword() { }

    async adminForgotPassword() { }

    async adminResetPassword() { }

    //HASH DATA FUNCTION
    hashData(data: string) {
        return bcrypt.hash(data, 10);
    };

    //USER GET TOKENS
    async getTokens(userId: string, email: string) {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                email,
            }, {
                secret: this.config.get("ACCESS_SECRET"), // Test this from the .env after it works
                expiresIn: "10h",
            }),

            this.jwtService.signAsync({
                sub: userId,
                email,
            }, {
                secret: this.config.get("REFRESH_SECRET"),
                expiresIn: "7d",
            })
        ]);
        return {
            access_token: at,
            refresh_token: rt,
        };
    };

    //EMPLOYEE GET TOKENS
    async getEmployeeTokens(adminId: string, email: string) {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({
                sub: adminId,
                email,
            }, {
                secret: this.config.get("ACCESS_SECRET"), // Test this from the .env after it works
                expiresIn: "10h",
            }),

            this.jwtService.signAsync({
                sub: adminId,
                email,
            }, {
                secret: this.config.get("REFRESH_SECRET"),
                expiresIn: "7d",
            })
        ]);

        return {
            email,
            access_token: at,
            refresh_token: rt,
        };
    };

    //USER UPDATE RT HASH
    async updateRtHash(userId: string, rt: string) {
        const hashRt = await this.hashData(rt);
        await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                hashedRt: hashRt,
            },
        });
    };

    //EMPLOYEE UPDATE RT HASH
    async updateEmployeeRtHash(adminId: string, rt: string) {
        const hashRt = await this.hashData(rt);
        await this.prisma.admin.update({
            where: {
                id: adminId,
            },
            data: {
                hashedRt: hashRt,
            },
        });
    };

    async logOut(userId: string) {
        try {
            await this.prisma.user.updateMany({
                where: {
                    id: userId,
                    hashedRt: {
                        not: null
                    },
                },
                data: {
                    hashedRt: null,
                },
            });
            return true;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async adminLogOut(adminId: string) {
        try {
            await this.prisma.admin.updateMany({
                where: {
                    id: adminId,
                    hashedRt: {
                        not: null
                    },
                },
                data: {
                    hashedRt: null,
                },
            });
            return true;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async getUserById(userId: string) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (!user) throw new UnauthorizedException("User not found");

            return user;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async getAdminById(adminId: string) {
        try {
            const admin = await this.prisma.admin.findUnique({
                where: {
                    id: adminId,
                },
            });
            if (!admin) throw new UnauthorizedException("Admin not found");

            return admin;
        } catch (error) {
            console.error(error);
            throw error;
        };
    }
}
