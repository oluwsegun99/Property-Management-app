import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { CreateProject, CreateProjectMedia, CreateProperty, CreatePropertyDetails, CreatePropertyMedia, CreatePrototype, CreatePrototypeMedia, UpdateProject, UpdatePrototype } from "src/graphql";
import { CreateProjectDTO, CreateProjectMediaDTO, CreatePropertyDetailsDTO, CreatePropertyDTO, CreatePropertyMediaDTO, CreatePrototypeDTO, CreatePrototypeMediaDTO, UpdateProjectDTO, UpdatePrototypeDTO } from "../validators/property.validator";


export async function validateCreateProjectDTO(dto: CreateProject): Promise<string[]> {
    const dtoForValidation = plainToClass(CreateProjectDTO, dto);

    const errors: ValidationError[] = await validate(dtoForValidation);
    if (errors.length > 0) {
        // Extract error messages
        return errors.map((error: ValidationError) => Object.values(error.constraints || {})).flat();
    }
    return [];
};

export async function validateProjectMediaArray(data: CreateProjectMedia[]): Promise<string[]> {
    const allErrors: string[] = [];

    for (const entry of data) {
        const dtoForValidation = plainToClass(CreateProjectMediaDTO, entry);
        const errors: ValidationError[] = await validate(dtoForValidation);
        if (errors.length > 0) {
            // Extract error messages for this entry
            const entryErrors = errors.map((error: ValidationError) => Object.values(error.constraints || {})).flat();
            allErrors.push(...entryErrors);
        };
    };

    return allErrors;
};

export async function validateUpdateProjectDTO(dto: UpdateProject): Promise<string[]> {
    const dtoForValidation = plainToClass(UpdateProjectDTO, dto);

    const errors: ValidationError[] = await validate(dtoForValidation);
    if (errors.length > 0) {
        // Extract error messages
        return errors.map((error: ValidationError) => Object.values(error.constraints || {})).flat();
    }
    return [];
};

export async function validateCreatePrototypeDTO(dto: CreatePrototype): Promise<string[]> {
    const dtoForValidation = plainToClass(CreatePrototypeDTO, dto);

    const errors: ValidationError[] = await validate(dtoForValidation);
    if (errors.length > 0) {
        // Extract error messages
        return errors.map((error: ValidationError) => Object.values(error.constraints || {})).flat();
    }
    return [];
};

export async function validatePrototypeMediaArray(data: CreatePrototypeMedia[]): Promise<string[]> {
    const allErrors: string[] = [];

    for (const entry of data) {
        const dtoForValidation = plainToClass(CreatePrototypeMediaDTO, entry);
        const errors: ValidationError[] = await validate(dtoForValidation);
        if (errors.length > 0) {
            // Extract error messages for this entry
            const entryErrors = errors.map((error: ValidationError) => Object.values(error.constraints || {})).flat();
            allErrors.push(...entryErrors);
        };
    };

    return allErrors;
};

export async function validateUpdatePrototypeDTO(dto: UpdatePrototype): Promise<string[]> {
    const dtoForValidation = plainToClass(UpdatePrototypeDTO, dto);

    const errors: ValidationError[] = await validate(dtoForValidation);
    if (errors.length > 0) {
        // Extract error messages
        return errors.map((error: ValidationError) => Object.values(error.constraints || {})).flat();
    }
    return [];
};

export async function validateCreatePropertyDTO(dto: CreateProperty): Promise<string[]> {
    const dtoForValidation = plainToClass(CreatePropertyDTO, dto);

    const errors: ValidationError[] = await validate(dtoForValidation);
    if (errors.length > 0) {
        // Extract error messages
        return errors.map((error: ValidationError) => Object.values(error.constraints || {})).flat();
    }
    return [];
};

export async function validateCreatePropertyDetailDTO(dto: CreatePropertyDetails): Promise<string[]> {
    const dtoForValidation = plainToClass(CreatePropertyDetailsDTO, dto);

    const errors: ValidationError[] = await validate(dtoForValidation);
    if (errors.length > 0) {
        // Extract error messages
        return errors.map((error: ValidationError) => Object.values(error.constraints || {})).flat();
    }
    return [];
};

export async function validatePropertyMediaArray(data: CreatePropertyMedia[]): Promise<string[]> {
    const allErrors: string[] = [];

    for (const entry of data) {
        const dtoForValidation = plainToClass(CreatePropertyMediaDTO, entry);
        const errors: ValidationError[] = await validate(dtoForValidation);
        if (errors.length > 0) {
            // Extract error messages for this entry
            const entryErrors = errors.map((error: ValidationError) => Object.values(error.constraints || {})).flat();
            allErrors.push(...entryErrors);
        };
    };

    return allErrors;
};