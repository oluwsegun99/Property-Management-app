import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { AdminSigninInput, AdminSignUpAfterInvite, AdminSignupInput, UserSigninInput, UserSignUpAfterInvite, UserSignUpInput } from "src/graphql";
import { AdminSigninInputDTO, AdminSignUpAfterInviteDTO, AdminSignUpInputDTO, UserSigninInputDTO, UserSignUpAfterInviteDTO, UserSignUpInputDTO } from "../validators/auth.validator";

export async function validateSignUpDTO(dto: UserSignUpInput): Promise<string[]> {
    const dtoForValidation = plainToClass(UserSignUpInputDTO, dto);

    const errors: ValidationError[] = await validate(dtoForValidation);
    if (errors.length > 0) {
        // Extract error messages
        return errors.map((error: ValidationError) => Object.values(error.constraints || {})).flat();
    }
    return [];
};

export async function validateUserSignUpAfterInviteDTO(dto: UserSignUpAfterInvite): Promise<string[]> {
    const dtoForValidation = plainToClass(UserSignUpAfterInviteDTO, dto);

    const errors: ValidationError[] = await validate(dtoForValidation);
    if (errors.length > 0) {
        // Extract error messages
        return errors.map((error: ValidationError) => Object.values(error.constraints || {})).flat();
    }
    return [];
};

export async function validateSignInDTO(dto: UserSigninInput): Promise<string[]> {
    const dtoForValidation = plainToClass(UserSigninInputDTO, dto);

    const errors: ValidationError[] = await validate(dtoForValidation);
    if (errors.length > 0) {
        // Extract error messages
        return errors.map((error: ValidationError) => Object.values(error.constraints || {})).flat();
    }
    return [];
};

export async function validateAdminSignUpDTO(dto: AdminSignupInput): Promise<string[]> {
    const dtoForValidation = plainToClass(AdminSignUpInputDTO, dto);

    const errors: ValidationError[] = await validate(dtoForValidation);
    if (errors.length > 0) {
        // Extract error messages
        return errors.map((error: ValidationError) => Object.values(error.constraints || {})).flat();
    }
    return [];
};

export async function validateAdminSignUpAfterInviteDTO(dto: AdminSignUpAfterInvite): Promise<string[]> {
    const dtoForValidation = plainToClass(AdminSignUpAfterInviteDTO, dto);

    const errors: ValidationError[] = await validate(dtoForValidation);
    if (errors.length > 0) {
        // Extract error messages
        return errors.map((error: ValidationError) => Object.values(error.constraints || {})).flat();
    }
    return [];
};

export async function validateAdminSignInDTO(dto: AdminSigninInput): Promise<string[]> {
    const dtoForValidation = plainToClass(AdminSigninInputDTO, dto);

    const errors: ValidationError[] = await validate(dtoForValidation);
    if (errors.length > 0) {
        // Extract error messages
        return errors.map((error: ValidationError) => Object.values(error.constraints || {})).flat();
    }
    return [];
};