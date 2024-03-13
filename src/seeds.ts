import { PrismaClient } from "@prisma/client";
import { Role } from "./common/enums/role.enum";


const prisma = new PrismaClient();

async function seed() {
    //ROLES
    const roleValues = Object.values(Role).map((role) => role.toString());

    const existingRoles = await prisma.role.findMany({
        select: {
            roleName: true,
        },
    });

    const existingRolesSet = new Set(existingRoles.map((role) => role.roleName));

    const rolesToDelete: string[] = [];

    //delete roles that are not in enum
    for (const role of existingRolesSet) {
        if (!roleValues.includes(role)) {
            rolesToDelete.push(role);
        };
    };

    if (rolesToDelete.length > 0) {
        await prisma.role.deleteMany({
            where: {
                roleName: {
                    in: rolesToDelete,
                },
            },
        });
    };

    //create roles in enum that don't exist in database
    const rolesData = roleValues.map((role) => {
        if (!existingRolesSet.has(role)) {
            return {
                roleName: role
            };
        };
    });

    if (rolesData.length > 0) {
        await prisma.role.createMany({
            data: rolesData,
        });
    };
};

seed()
    .catch((error) => {
        console.error(error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });