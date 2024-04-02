import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrequalificationStatus, PrequalificationStatusEnum } from 'src/common/enums/prequalification.enum';
import { Role } from 'src/common/enums/role.enum';
import { validateCreatePrequalificationDTO, validateUpdatePrequalificationDTO, validateUserCreateInviteDTO } from 'src/common/validationFunctions/user.validation';
import { CreatePrequalification, UpdatePrequalification, UserCreateInvite } from 'src/graphql';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async userCreateInvite(userId: string, dto: UserCreateInvite) {
        try {
            // Validate
            const errors: string[] = await validateUserCreateInviteDTO(dto);
            if (errors.length > 0) {
                const errorMessage = `Validation error: ${errors.join(', ')}`;
                throw new ForbiddenException(errorMessage);
            };

            // authorization
            const user = await this.prisma.userDeveloperCompany.findFirst({
                where: {
                    userId,
                    developerCompanyId: dto.developerCompanyId,
                    isOwner: true,
                },
            });
            if (!user) throw new UnauthorizedException("Access Denied: User unauthorized or Invalid Company");

            const roleExists = await this.prisma.role.findUnique({
                where: {
                    id: dto.roleId,
                },
            });
            if (!roleExists) throw new ForbiddenException("Role not found");

            const validRoles: any = [Role.Manager, Role.Agent, Role.Staff];

            if (!validRoles.includes(roleExists.roleName)) {
                throw new ForbiddenException('Invalid role');
            };

            //find existing user
            const userExists = await this.prisma.user.findUnique({
                where: {
                    email: dto.email,
                },
            });
            if (userExists) throw new ForbiddenException("User email already used");

            const newUserInvite = await this.prisma.userDeveloperInvite.create({
                data: {
                    ...dto,
                },
            });

            return newUserInvite;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async getAllUsers() {
        try {
            return await this.prisma.user.findMany();
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async deleteUserByEmail(email: string) {
        try {
            const userExists = await this.prisma.user.findUnique({
                where: {
                    email,
                },
            });
            if (!userExists) throw new ForbiddenException("User not found");

            await this.prisma.user.delete({
                where: {
                    id: userExists.id,
                },
            });

            return true;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async deleteUserById(userId: string) {
        try {
            const userExists = await this.prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (!userExists) throw new ForbiddenException("User not found");

            await this.prisma.user.delete({
                where: {
                    id: userExists.id,
                },
            });

            return true;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteAllUsers() {
        try {
            await this.prisma.user.deleteMany();
            return true;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async addPropertyToWishlist(userId: string, propertyId: string) {
        try {
            //authorization
            const user = await this.prisma.user.findFirst({
                where: {
                    id: userId,
                    isDeveloper: false,
                    hasCompany: false,
                },
                select: {
                    userWishlists: true,
                },
            });
            if (!user) throw new UnauthorizedException("Access denied");

            const propertyAlreadyAdded = user.userWishlists.find((wishlist) => wishlist.propertyId === propertyId);
            if (propertyAlreadyAdded) throw new ForbiddenException("Property already in wishlist");

            const propertyExists = await this.prisma.property.findUnique({
                where: {
                    id: propertyId,
                },
            });
            if (!propertyExists) throw new ForbiddenException("Property not found");

            await this.prisma.userWishlist.create({
                data: {
                    propertyId,
                    userId,
                },
            });

            return true;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async getAllUserWishlists() {
        try {
            return await this.prisma.userWishlist.findMany();
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async getUserWishlistsByUser(userId: string) {
        try {
            //authorization
            const user = await this.prisma.user.findFirst({
                where: {
                    id: userId,
                    isDeveloper: false,
                    hasCompany: false
                },
                select: {
                    isDeveloper: true,
                    hasCompany: true,
                    userWishlists: {
                        select: {
                            property: {
                                include: {
                                    project: true,
                                    prototype: true,
                                    propertyDetail: true,
                                    propertiesMedia: {
                                        include: {
                                            propertyMediaCategory: true,
                                        },
                                    },
                                }
                            },
                        },
                    },
                },
            });
            if (!user) throw new UnauthorizedException("Access denied");

            const wishlist = user.userWishlists.map((list) => list.property);

            return wishlist;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async getUserWishlistById() { }

    async deletePropertyfromWishlist(userId: string, propertyId: string) {
        try {
            //authorization
            const user = await this.prisma.user.findFirst({
                where: {
                    id: userId,
                    isDeveloper: false,
                    hasCompany: false
                },
                select: {
                    isDeveloper: true,
                    hasCompany: true,
                    userWishlists: {
                        select: {
                            id: true,
                            propertyId: true,
                        },
                    },
                },
            });
            if (!user) throw new UnauthorizedException("Access denied");

            const userWishlists = user.userWishlists;
            const propertyExistsInWishlist = userWishlists.find((wishlist) => wishlist.propertyId === propertyId);
            if (!propertyExistsInWishlist) throw new ForbiddenException("Property not found in wishlist");

            await this.prisma.userWishlist.delete({
                where: {
                    id: propertyExistsInWishlist.id,
                },
            });

            return true;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async deleteAllUserWishlists() {
        try {
            await this.prisma.userWishlist.deleteMany();
            return true;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async createPrequalification(userId: string, dto: CreatePrequalification) {
        try {
            // Validate
            const errors: string[] = await validateCreatePrequalificationDTO(dto);
            if (errors.length > 0) {
                const errorMessage = `Validation error: ${errors.join(', ')}`;
                throw new ForbiddenException(errorMessage);
            };

            //authorization
            const user = await this.prisma.user.findFirst({
                where: {
                    id: userId,
                    isDeveloper: false,
                    hasCompany: false,
                },
            });
            if (!user) throw new UnauthorizedException("Access denied");

            const pendingPrequalification = await this.prisma.prequalificationStatus.findUnique({
                where: {
                    id: PrequalificationStatusEnum.Pending,
                },
            });
            if (!pendingPrequalification) throw new ForbiddenException("Pending prequalification status not found");

            const newPrequalification = await this.prisma.prequalification.create({
                data: {
                    ...dto,
                    prequalificationStatusId: pendingPrequalification.id,
                    userId,
                },
            });

            return newPrequalification;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async getPrequalifications() {
        try {
            return await this.prisma.prequalification.findMany({
                include: {
                    prequalificationStatus: true,
                    user: true,
                },
            });
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async getPrequalificationById(prequalificationId: string) {
        try {
            const prequalification = await this.prisma.prequalification.findUnique({
                where: {
                    id: prequalificationId,
                },
                include: {
                    prequalificationStatus: true,
                    user: true,
                },
            });
            if (!prequalification) throw new ForbiddenException("Prequalification not found");

            return prequalification;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async getPrequalificationsByUser(userId: string) {
        try {
            //authorization
            const user = await this.prisma.user.findFirst({
                where: {
                    id: userId,
                    isDeveloper: false,
                    hasCompany: false,
                },
                include: {
                    prequalifications: {
                        include: {
                            prequalificationStatus: true,
                        },
                    },
                },
            });
            if (!user) throw new UnauthorizedException("Access denied");

            return user.prequalifications;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async updatePrequalification(userId: string, dto: UpdatePrequalification) {
        try {
            // Validate
            const errors: string[] = await validateUpdatePrequalificationDTO(dto);
            if (errors.length > 0) {
                const errorMessage = `Validation error: ${errors.join(', ')}`;
                throw new ForbiddenException(errorMessage);
            };

            //authorization
            const user = await this.prisma.user.findFirst({
                where: {
                    id: userId,
                    isDeveloper: false,
                    hasCompany: false,
                },
            });
            if (!user) throw new UnauthorizedException("Access denied");

            const prequalification = await this.prisma.prequalification.findUnique({
                where: {
                    id: dto.prequalificationId,
                },
            });
            if (!prequalification) throw new ForbiddenException("Prequalification not found");
            if (prequalification.prequalificationStatusId !== PrequalificationStatusEnum.Pending) throw new ForbiddenException("Cannot update prequalification");

            const updatedPrequalification = await this.prisma.prequalification.update({
                where: {
                    id: dto.prequalificationId,
                },
                data: {
                    fullname: dto.fullname,
                    email: dto.email,
                    incomeMonthly: dto.incomeMonthly,
                    isSelfEmployed: dto.isSelfEmployed,
                    isJointApplication: dto.isJointApplication,
                    companyName: dto.companyName,
                    companyAddress: dto.companyAddress,
                    spouseEmail: dto.spouseEmail,
                },
            });

            return updatedPrequalification;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async deletePrequalification(userId: string, prequalificationId: string) {
        try {
            //authorization
            const user = await this.prisma.user.findFirst({
                where: {
                    id: userId,
                    isDeveloper: false,
                    hasCompany: false,
                },
            });
            if (!user) throw new UnauthorizedException("Access denied");

            const prequalification = await this.prisma.prequalification.findUnique({
                where: {
                    id: prequalificationId,
                },
            });
            if (!prequalification) throw new ForbiddenException("Prequalification not found");

            await this.prisma.prequalification.delete({
                where: {
                    id: prequalificationId,
                },
            });

            return true;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async deleteAllPrequalifications() {
        try {
            await this.prisma.prequalification.deleteMany();
            return true;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };
}
