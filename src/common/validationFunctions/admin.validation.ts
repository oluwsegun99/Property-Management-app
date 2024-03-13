import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { AdminCreateInvite } from "src/graphql";
import { AdminCreateInviteDTO } from "../validators/admin.validator";


export async function validateAdminCreateInviteDTO(dto: AdminCreateInvite): Promise<string[]> {
    const dtoForValidation = plainToClass(AdminCreateInviteDTO, dto);

    const errors: ValidationError[] = await validate(dtoForValidation);
    if (errors.length > 0) {
        // Extract error messages
        return errors.map((error: ValidationError) => Object.values(error.constraints || {})).flat();
    }
    return [];
};