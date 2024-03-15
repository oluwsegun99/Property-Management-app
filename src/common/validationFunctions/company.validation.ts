import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { CreateDeveloperCompany, UpdateDeveloperCompany } from "src/graphql";
import { CreateDeveloperCompanyDTO, UpdateDeveloperCompanyDTO } from "../validators/company.validator";


export async function validateCreateDeveloperCompanyDTO(dto: CreateDeveloperCompany): Promise<string[]> {
    const dtoForValidation = plainToClass(CreateDeveloperCompanyDTO, dto);

    const errors: ValidationError[] = await validate(dtoForValidation);
    if (errors.length > 0) {
        // Extract error messages
        return errors.map((error: ValidationError) => Object.values(error.constraints || {})).flat();
    }
    return [];
};

export async function validateUpdateDeveloperCompanyDTO(dto: UpdateDeveloperCompany): Promise<string[]> {
    const dtoForValidation = plainToClass(UpdateDeveloperCompanyDTO, dto);

    const errors: ValidationError[] = await validate(dtoForValidation);
    if (errors.length > 0) {
        // Extract error messages
        return errors.map((error: ValidationError) => Object.values(error.constraints || {})).flat();
    }
    return [];
};