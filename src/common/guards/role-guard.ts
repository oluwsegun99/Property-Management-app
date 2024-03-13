import { Injectable, CanActivate, ExecutionContext, Global, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma/prisma.service';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private prisma: PrismaService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true;
        }
        // const { sub } = context.switchToHttp().getRequest();

        const ctx = GqlExecutionContext.create(context);
        const sub = ctx.getContext().req.user["sub"];

        let dbUser;

        const user = await this.prisma.user.findUnique({
            where: {
                id: sub,
            },
            include: {
                role: true,
            }
        });

        if (user) {
            dbUser = user;
        } else {
            const admin = await this.prisma.admin.findUnique({
                where: {
                    id: sub,
                },
                include: {
                    role: true,
                },
            });
            if (!admin) throw new ForbiddenException("Access Denied");

            dbUser = admin;
        };

        if (!dbUser || !dbUser.role) throw new ForbiddenException("Access Denied");

        const access = requiredRoles.some((role) => dbUser.role.roleName.includes(role));

        return access;
    };
}