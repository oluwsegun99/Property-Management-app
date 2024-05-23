import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Matches } from 'class-validator';

export class MortgageCalculatorInputDTO {
    @IsNumber()
    propertyPrice: number;

    @IsNumber()
    downPaymentPercentage: number;

    @IsNumber()
    durationTypeId: number;

    @IsNumber()
    mortgageDuration: number;

    @IsNumber()
    interestRate: number;
};

export class CreateMortgageDTO {
    @IsOptional()
    @IsNotEmpty({ message: 'Co-applicant name should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Co-applicant name should not contain only whitespace' })
    coApplicantName?: string;

    @IsOptional()
    @IsNotEmpty({ message: 'Co-applicant email should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Co-applicant email should not contain only whitespace' })
    coApplicantEmail?: string;

    @IsNotEmpty({ message: 'Down payment percentage should not be empty' })
    @IsNumber()
    downPaymentPercentage: number;

    @IsNotEmpty({ message: 'Application date should not be empty' })
    @IsDate()
    applicationDate: Date;

    @IsNotEmpty({ message: 'Interest rate should not be empty' })
    @IsNumber()
    interestRate: number;

    @IsNotEmpty({ message: 'Mortgage duration should not be empty' })
    @IsNumber()
    mortgageDuration: number;

    @IsNotEmpty({ message: 'Property ID should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Property ID should not contain only whitespace' })
    propertyId: string;

    @IsNotEmpty({ message: 'Property purchase request ID should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Property purchase request ID should not contain only whitespace' })
    propertyPurchaseReqId: string;

    @IsNotEmpty({ message: 'Duration Type ID should not be empty' })
    @IsNumber()
    durationTypeId: number;
};

export class UpdateMortgageDTO {
    @IsNotEmpty({ message: 'Mortgage ID should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Mortgage ID should not contain only whitespace' })
    mortgageId: string;

    @IsOptional()
    @IsNotEmpty({ message: 'Co-applicant name should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Co-applicant name should not contain only whitespace' })
    coApplicantName?: string;

    @IsOptional()
    @IsNotEmpty({ message: 'Co-applicant email should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Co-applicant email should not contain only whitespace' })
    coApplicantEmail?: string;

    @IsOptional()
    @IsNotEmpty({ message: 'Down payment percentage should not be empty' })
    @IsNumber()
    downPaymentPercentage?: number;

    @IsOptional()
    @IsNotEmpty({ message: 'Interest rate should not be empty' })
    @IsNumber()
    interestRate?: number;

    @IsOptional()
    @IsNotEmpty({ message: 'Mortgage duration should not be empty' })
    @IsNumber()
    mortgageDuration?: number;

    @IsOptional()
    @IsNotEmpty({ message: 'Property purchase request ID should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Property purchase request ID should not contain only whitespace' })
    propertyPurchaseReqId?: string;

    @IsOptional()
    @IsNotEmpty({ message: 'Duration type ID should not be empty' })
    @IsNumber()
    durationTypeId?: number;
};