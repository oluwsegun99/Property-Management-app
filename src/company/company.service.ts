import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Role } from 'src/common/enums/role.enum';
import { validateCreateDeveloperCompanyDTO, validateUpdateDeveloperCompanyDTO } from 'src/common/validationFunctions/company.validation';
import { CreateDeveloperCompany, UpdateDeveloperCompany } from 'src/graphql';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompanyService {
    constructor(private prisma: PrismaService) { }

    async createDeveloperCompany(userId: string, dto: CreateDeveloperCompany) {
        try {
            // Validate
            const errors: string[] = await validateCreateDeveloperCompanyDTO(dto);
            if (errors.length > 0) {
                const errorMessage = `Validation error: ${errors.join(', ')}`;
                throw new ForbiddenException(errorMessage);
            };

            const user = await this.prisma.user.findUnique({
                where: {
                    id: userId,
                },
                include: {
                    role: true,
                    userDeveloperCompany: true,
                },
            });
            if (!user) throw new UnauthorizedException("Access denied");

            // if (user.role.roleName !== Role.Owner) throw new ForbiddenException("Access denied: Invalid role");
            if (user.isDeveloper !== true) throw new ForbiddenException("Access denied: not developer");
            if (user.hasCompany !== true) throw new ForbiddenException("User has no company");
            if (user.userDeveloperCompany) throw new ForbiddenException("User already belongs to a company");

            const developerCompany = await this.prisma.$transaction(async (prisma) => {
                const companyExists = await prisma.developerCompany.findFirst({
                    where: {
                        companyEmail: dto.companyEmail,
                    },
                });
                if (companyExists) throw new ForbiddenException("Company email already used");

                //check if user is already assigned to company
                const userCompanyExists = await prisma.userDeveloperCompany.findFirst({
                    where: {
                        userId,
                    },
                });
                if (userCompanyExists) throw new ForbiddenException("User already assigned to a company");

                const typeExists = await prisma.companyType.findUnique({
                    where: {
                        id: dto.companyTypeId,
                    },
                });
                if (!typeExists) throw new ForbiddenException("Company type not found");

                const newDeveloperCompany = await prisma.developerCompany.create({
                    data: {
                        ...dto,
                        ownedById: userId,
                    },
                });

                await prisma.userDeveloperCompany.create({
                    data: {
                        developerCompanyId: newDeveloperCompany.id,
                        userId,
                        isOwner: true,
                    },
                });

                return newDeveloperCompany;
            });

            return developerCompany
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async getDeveloperCompanies() {
        try {
            return await this.prisma.developerCompany.findMany();
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async getDeveloperCompanyById(companyId: string) {
        try {
            const company = await this.prisma.developerCompany.findUnique({
                where: {
                    id: companyId,
                },
            });
            if (!company) throw new ForbiddenException("Company not found");

            return company;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async getDeveloperCompanyByUser(userId: string) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: userId,
                },
                include: {
                    userDeveloperCompany: {
                        select: {
                            developerCompany: true,
                        },
                    },
                },
            });
            if (!user) throw new UnauthorizedException("Access denied");

            if (!user.userDeveloperCompany.developerCompany) throw new ForbiddenException("Company not found: No company assigned");

            const userDeveloperCompany = user.userDeveloperCompany.developerCompany;

            return userDeveloperCompany;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async updateDeveloperCompany(userId: string, dto: UpdateDeveloperCompany) {
        try {
            // Validate
            const errors: string[] = await validateUpdateDeveloperCompanyDTO(dto);
            if (errors.length > 0) {
                const errorMessage = `Validation error: ${errors.join(', ')}`;
                throw new ForbiddenException(errorMessage);
            };

            //user authorization
            const userCompany = await this.prisma.userDeveloperCompany.findFirst({
                where: {
                    userId,
                    developerCompanyId: dto.companyId,
                    isOwner: true,
                },
            });
            if (!userCompany) throw new UnauthorizedException("Access denied");

            const developerCompanies = await this.prisma.developerCompany.findMany({
                select: {
                    id: true,
                    companyEmail: true,
                },
            });

            const companyExists = developerCompanies.find((company) => company.id === dto.companyId);
            if (!companyExists) throw new ForbiddenException("Company not found");

            const developerCompany = await this.prisma.$transaction(async (prisma) => {
                const companyEmailExists = developerCompanies.find((company) => company.companyEmail === dto.companyEmail && company.id !== dto.companyId);
                if (companyEmailExists) throw new ForbiddenException("Company email already used");

                if (dto.companyTypeId) {
                    const typeExists = await prisma.companyType.findUnique({
                        where: {
                            id: dto.companyTypeId,
                        },
                    });
                    if (!typeExists) throw new ForbiddenException("Company type not found");
                };

                const updatedCompany = await prisma.developerCompany.update({
                    where: {
                        id: dto.companyId,
                    },
                    data: {
                        companyEmail: dto.companyEmail,
                        companyMobile: dto.companyMobile,
                        companyName: dto.companyName,
                        companyTypeId: dto.companyTypeId,
                        companyLogo: dto.companyLogo,
                        registrationNumber: dto.registrationNumber,
                        description: dto.description,
                        website: dto.website,
                        address: dto.address,
                    },
                });

                return updatedCompany;
            });

            return developerCompany;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async deleteDeveloperCompany(userId: string, companyId: string) {
        try {
            //user authorization
            const userCompany = await this.prisma.userDeveloperCompany.findFirst({
                where: {
                    userId,
                    developerCompanyId: companyId,
                    isOwner: true,
                },
            });
            if (!userCompany) throw new UnauthorizedException("Access denied");

            const companyExists = await this.prisma.developerCompany.findUnique({
                where: {
                    id: companyId,
                },
            });
            if (!companyExists) throw new ForbiddenException("Company not found");

            await this.prisma.developerCompany.delete({
                where: {
                    id: companyId,
                },
            });

            return true;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async deleteAllDeveloperCompanies() {
        try {
            await this.prisma.developerCompany.deleteMany();
            return true;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };
}
