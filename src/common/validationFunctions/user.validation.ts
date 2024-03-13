import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { UserCreateInvite } from "src/graphql";
import { UserCreateInviteDTO } from "../validators/user.validator";


export async function validateUserCreateInviteDTO(dto: UserCreateInvite): Promise<string[]> {
    const dtoForValidation = plainToClass(UserCreateInviteDTO, dto);

    const errors: ValidationError[] = await validate(dtoForValidation);
    if (errors.length > 0) {
        // Extract error messages
        return errors.map((error: ValidationError) => Object.values(error.constraints || {})).flat();
    }
    return [];
};