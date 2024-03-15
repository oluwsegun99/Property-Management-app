import { IsString, IsNotEmpty, IsEmail, Matches, IsNumber, IsOptional } from 'class-validator';

export class CreateDeveloperCompanyDTO {
    @IsNotEmpty({ message: 'Company name should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Company name should not contain only whitespace' })
    companyName: string;

    @IsNotEmpty({ message: 'Company email should not be empty' })
    @IsEmail({}, { message: 'Invalid email format' })
    companyEmail: string;

    @IsNotEmpty({ message: 'Company mobile should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Company mobile should not contain only whitespace' })
    companyMobile: string;

    @IsNotEmpty({ message: 'Company type ID should not be empty' })
    @IsNumber({}, { message: 'Invalid company type ID' })
    companyTypeId: number;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Registration number should not contain only whitespace' })
    registrationNumber?: string;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Address should not contain only whitespace' })
    address?: string;
};

export class UpdateDeveloperCompanyDTO {
    @IsNotEmpty({ message: 'Company ID should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Company ID should not contain only whitespace' })
    companyId: string;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Company name should not contain only whitespace' })
    companyName?: string;

    @IsOptional()
    @IsEmail({}, { message: 'Invalid email format' })
    @Matches(/^\s*\S.*$/, { message: 'Company email should not contain only whitespace' })
    companyEmail?: string;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Company mobile should not contain only whitespace' })
    companyMobile?: string;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Registration number should not contain only whitespace' })
    registrationNumber?: string;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Company logo should not contain only whitespace' })
    companyLogo?: string;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Description should not contain only whitespace' })
    description?: string;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Website should not contain only whitespace' })
    website?: string;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Address should not contain only whitespace' })
    address?: string;

    @IsOptional()
    @IsNumber({}, { message: 'Invalid company type ID' })
    companyTypeId?: number;
};