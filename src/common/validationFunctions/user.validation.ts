import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { CreatePrequalification, UpdatePrequalification, UserCreateInvite } from "src/graphql";
import { CreatePrequalificationDTO, UpdatePrequalificationDTO, UserCreateInviteDTO } from "../validators/user.validator";


export async function validateUserCreateInviteDTO(dto: UserCreateInvite): Promise<string[]> {
    const dtoForValidation = plainToClass(UserCreateInviteDTO, dto);

    const errors: ValidationError[] = await validate(dtoForValidation);
    if (errors.length > 0) {
        // Extract error messages
        return errors.map((error: ValidationError) => Object.values(error.constraints || {})).flat();
    }
    return [];
};

export async function validateCreatePrequalificationDTO(dto: CreatePrequalification): Promise<string[]> {
    const dtoForValidation = plainToClass(CreatePrequalificationDTO, dto);

    const errors: ValidationError[] = await validate(dtoForValidation);
    if (errors.length > 0) {
        // Extract error messages
        return errors.map((error: ValidationError) => Object.values(error.constraints || {})).flat();
    }
    return [];
};

export async function validateUpdatePrequalificationDTO(dto: UpdatePrequalification): Promise<string[]> {
    const dtoForValidation = plainToClass(UpdatePrequalificationDTO, dto);

    const errors: ValidationError[] = await validate(dtoForValidation);
    if (errors.length > 0) {
        // Extract error messages
        return errors.map((error: ValidationError) => Object.values(error.constraints || {})).flat();
    }
    return [];
};