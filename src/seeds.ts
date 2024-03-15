import { PrismaClient } from "@prisma/client";
import { CompanyType } from "./common/enums/companyType.enum";
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


    //CompanyTypes
    const companyTypeValues = Object.values(CompanyType).map((type) => type.toString());

    const existingCompanyTypes = await prisma.companyType.findMany({
        select: {
            type: true,
        },
    });

    const existingCompanyTypeSet = new Set(existingCompanyTypes.map((companyType) => companyType.type));

    const typesToDelete: string[] = [];

    for (const type of existingCompanyTypeSet) {
        if (!companyTypeValues.includes(type)) {
            typesToDelete.push(type);
        };
    };

    if (typesToDelete.length > 0) {
        await prisma.companyType.deleteMany({
            where: {
                type: {
                    in: typesToDelete,
                },
            },
        });
    };

    const typesToCreate: {
        id: number,
        type: string
    }[] = [];

    let typeIndex = 0;

    for (const type of companyTypeValues) {
        typeIndex++;

        if (existingCompanyTypeSet.has(type)) {
            continue;
        } else if (!existingCompanyTypeSet.has(type)) {
            typesToCreate.push({
                id: typeIndex,
                type: type,
            });
        };
    };

    if (typesToCreate.length > 0) {
        await prisma.companyType.createMany({
            data: typesToCreate,
        });
    };

    await prisma.user.deleteMany();
};

seed()
    .catch((error) => {
        console.error(error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });