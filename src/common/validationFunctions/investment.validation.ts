import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { CreateInvestment, ResumeInvestment, UpdateInvestment } from "src/graphql";
import { CreateInvestmentDTO, UpdateInvestmentDTO } from "../validators/investment.validator";


export async function validateCreateInvestmentDTO(dto: CreateInvestment): Promise<string[]> {
    const dtoForValidation = plainToClass(CreateInvestmentDTO, dto);

    const errors: ValidationError[] = await validate(dtoForValidation);
    if (errors.length > 0) {
        // Extract error messages
        return errors.map((error: ValidationError) => Object.values(error.constraints || {})).flat();
    }
    return [];
};

export async function validateUpdateInvestmentDTO(dto: UpdateInvestment): Promise<string[]> {
    const dtoForValidation = plainToClass(UpdateInvestmentDTO, dto);

    const errors: ValidationError[] = await validate(dtoForValidation);
    if (errors.length > 0) {
        // Extract error messages
        return errors.map((error: ValidationError) => Object.values(error.constraints || {})).flat();
    }
    return [];
};

export async function validateResumeInvestmentDTO(dto: ResumeInvestment): Promise<string[]> {
    const dtoForValidation = plainToClass(UpdateInvestmentDTO, dto);

    const errors: ValidationError[] = await validate(dtoForValidation);
    if (errors.length > 0) {
        // Extract error messages
        return errors.map((error: ValidationError) => Object.values(error.constraints || {})).flat();
    }
    return [];
};