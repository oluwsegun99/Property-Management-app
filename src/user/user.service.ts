import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Role } from 'src/common/enums/role.enum';
import { validateUserCreateInviteDTO } from 'src/common/validationFunctions/user.validation';
import { UserCreateInvite } from 'src/graphql';
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
}
