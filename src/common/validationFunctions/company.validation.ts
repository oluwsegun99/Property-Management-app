import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { CreateDeveloperCompany } from "src/graphql";
import { CreateDeveloperCompanyDTO } from "../validators/company.validator";


export async function validateCreateDeveloperCompanyDTO(dto: CreateDeveloperCompany): Promise<string[]> {
    const dtoForValidation = plainToClass(CreateDeveloperCompanyDTO, dto);

    const errors: ValidationError[] = await validate(dtoForValidation);
    if (errors.length > 0) {
        // Extract error messages
        return errors.map((error: ValidationError) => Object.values(error.constraints || {})).flat();
    }
    return [];
};