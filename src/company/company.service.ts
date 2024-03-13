import { ForbiddenException, Injectable } from '@nestjs/common';
import { validateCreateDeveloperCompanyDTO } from 'src/common/validationFunctions/company.validation';
import { CreateDeveloperCompany } from 'src/graphql';
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

        } catch (error) {
            console.error(error);
            throw error;
        };
    };


}
