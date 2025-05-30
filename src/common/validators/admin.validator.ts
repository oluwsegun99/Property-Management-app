import { IsString, IsNotEmpty, IsEmail, Matches, IsNumber } from 'class-validator';

export class AdminCreateInviteDTO {
    @IsNotEmpty({ message: 'Fullname should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Fullname should not contain only whitespace' })
    fullname: string;

    @IsNotEmpty({ message: 'Email should not be empty' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsNotEmpty({ message: 'Mobile should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Mobile should not contain only whitespace' })
    mobile: string;

    @IsNotEmpty({ message: 'Role ID should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Role ID should not contain only whitespace' })
    roleId: string;
};

export class AdminApprovePrequalificationDTO {
    @IsNotEmpty({ message: 'Prequalification ID should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Prequalification ID should not contain only whitespace' })
    prequalificationId: string;

    @IsNotEmpty({ message: 'Prequalification status ID should not be empty' })
    @IsNumber()
    prequalificationStatusId: number;
}