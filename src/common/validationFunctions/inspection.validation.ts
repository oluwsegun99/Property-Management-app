import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { CreateInspectionSchedule, UpdateInspectionSchedule } from "src/graphql";
import { CreateInspectionScheduleDTO, UpdateInspectionScheduleDTO } from "../validators/inspection.validator";


export async function validateCreateInspectionScheduleDTO(dto: CreateInspectionSchedule): Promise<string[]> {
    const dtoForValidation = plainToClass(CreateInspectionScheduleDTO, dto);

    const errors: ValidationError[] = await validate(dtoForValidation);
    if (errors.length > 0) {
        // Extract error messages
        return errors.map((error: ValidationError) => Object.values(error.constraints || {})).flat();
    }
    return [];
};

export async function validateUpdateInspectionScheduleDTO(dto: UpdateInspectionSchedule): Promise<string[]> {
    const dtoForValidation = plainToClass(UpdateInspectionScheduleDTO, dto);

    const errors: ValidationError[] = await validate(dtoForValidation);
    if (errors.length > 0) {
        // Extract error messages
        return errors.map((error: ValidationError) => Object.values(error.constraints || {})).flat();
    }
    return [];
};