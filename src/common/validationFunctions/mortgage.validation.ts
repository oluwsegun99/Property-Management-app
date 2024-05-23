import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { CreateMortgage, MortgageCalculatorInput, UpdateMortgage } from "src/graphql";
import { CreateMortgageDTO, MortgageCalculatorInputDTO, UpdateMortgageDTO } from "../validators/mortgage.validator";

export async function validateMortgageCalculatorInputDTO(dto: MortgageCalculatorInput): Promise<string[]> {
    const dtoForValidation = plainToClass(MortgageCalculatorInputDTO, dto);

    const errors: ValidationError[] = await validate(dtoForValidation);
    if (errors.length > 0) {
        // Extract error messages
        return errors.map((error: ValidationError) => Object.values(error.constraints || {})).flat();
    }
    return [];
};

export async function validateCreateMortgageDTO(dto: CreateMortgage): Promise<string[]> {
    const dtoForValidation = plainToClass(CreateMortgageDTO, dto);

    const errors: ValidationError[] = await validate(dtoForValidation);
    if (errors.length > 0) {
        // Extract error messages
        return errors.map((error: ValidationError) => Object.values(error.constraints || {})).flat();
    }
    return [];
};

export async function validateUpdateMortgageDTO(dto: UpdateMortgage): Promise<string[]> {
    const dtoForValidation = plainToClass(UpdateMortgageDTO, dto);

    const errors: ValidationError[] = await validate(dtoForValidation);
    if (errors.length > 0) {
        // Extract error messages
        return errors.map((error: ValidationError) => Object.values(error.constraints || {})).flat();
    }
    return [];
};