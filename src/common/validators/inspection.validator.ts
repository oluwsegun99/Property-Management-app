import { IsString, IsNotEmpty, IsNumber, IsDateString, Matches, IsDate, IsOptional } from 'class-validator';

export class CreateInspectionScheduleDTO {
    @IsNotEmpty({ message: 'Property ID should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Property ID should not contain only whitespace' })
    propertyId: string;

    @IsNotEmpty({ message: 'Date scheduled should not be empty' })
    @IsDate()
    dateScheduled: Date;

    @IsNotEmpty({ message: 'Inspection type ID should not be empty' })
    @IsNumber()
    inspectionTypeId: number;
};

export class UpdateInspectionScheduleDTO {
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Schedule ID should not contain only whitespace' })
    scheduleId: string;

    @IsOptional()
    @IsDate()
    dateScheduled?: string;

    @IsOptional()
    @IsNumber()
    @Matches(/^\s*\S.*$/, { message: 'Inspection type ID should not contain only whitespace' })
    inspectionTypeId?: number;
}