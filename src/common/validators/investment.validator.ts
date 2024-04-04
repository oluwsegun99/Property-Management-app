import { IsOptional, IsString, IsNumber, IsDateString, Matches, IsDate, IsNotEmpty } from 'class-validator';

export class CreateInvestmentDTO {
    @IsNotEmpty()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Description should not contain only whitespace' })
    description: string;

    @IsNotEmpty()
    @IsNumber()
    totalAmount: number;

    @IsNotEmpty({ message: 'Start date should not be empty' })
    @IsDate()
    startDate: Date;

    @IsNotEmpty()
    @IsNumber()
    duration: number;

    @IsNotEmpty()
    @IsNumber()
    investmentFrequencyId: number;
};

export class UpdateInvestmentDTO {
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Investment ID should not contain only whitespace' })
    investmentId: string;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Description should not contain only whitespace' })
    description?: string;

    @IsOptional()
    @IsNumber()
    totalAmount?: number;

    @IsOptional()
    @IsDate()
    startDate?: string;

    @IsOptional()
    @IsNumber()
    duration?: number;

    @IsOptional()
    @IsNumber()
    investmentFrequencyId?: number;
};

export class ResumeInvestmentDTO {
    @IsNotEmpty({ message: 'Investment ID should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Investment ID should not contain only whitespace' })
    investmentId: string;

    @IsNotEmpty({ message: 'Resume date should not be empty' })
    @IsDate()
    resumeDate: string;
}