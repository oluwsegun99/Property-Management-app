import { IsString, IsNotEmpty, IsEmail, Matches, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class UserCreateInviteDTO {
    @IsNotEmpty({ message: 'Email should not be empty' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsNotEmpty({ message: 'Fullname should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Fullname should not contain only whitespace' })
    fullname: string;

    @IsNotEmpty({ message: 'Mobile should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Mobile should not contain only whitespace' })
    mobile: string;

    @IsNotEmpty({ message: 'Developer Company ID should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Developer Company ID should not contain only whitespace' })
    developerCompanyId: string;

    @IsNotEmpty({ message: 'Role ID should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Role ID should not contain only whitespace' })
    roleId: string;
};

export class CreatePrequalificationDTO {
    @IsNotEmpty({ message: 'Fullname should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Fullname should not contain only whitespace' })
    fullname: string;

    @IsNotEmpty({ message: 'Email should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Email should not contain only whitespace' })
    email: string;

    @IsNotEmpty({ message: 'Income monthly should not be empty' })
    @IsNumber()
    incomeMonthly: number;

    @IsOptional()
    @IsBoolean()
    isSelfEmployed?: boolean;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Company name should not contain only whitespace' })
    companyName?: string;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Company address should not contain only whitespace' })
    companyAddress?: string;

    @IsOptional()
    @IsBoolean()
    isJointApplication?: boolean;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Spouse email should not contain only whitespace' })
    spouseEmail?: string;
}

export class UpdatePrequalificationDTO {
    @IsNotEmpty({ message: 'Prequalification ID should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Prequalification ID should not contain only whitespace' })
    prequalificationId: string;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Fullname should not contain only whitespace' })
    fullname?: string;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Email should not contain only whitespace' })
    email?: string;

    @IsOptional()
    @IsNumber()
    incomeMonthly?: number;

    @IsOptional()
    @IsBoolean()
    isSelfEmployed?: boolean;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Company name should not contain only whitespace' })
    companyName?: string;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Company address should not contain only whitespace' })
    companyAddress?: string;

    @IsOptional()
    @IsBoolean()
    isJointApplication?: boolean;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Spouse email should not contain only whitespace' })
    spouseEmail?: string;
}