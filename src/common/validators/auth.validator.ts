import { IsString, IsNotEmpty, IsEmail, MinLength, Matches, IsOptional, IsBoolean } from 'class-validator';

export class UserSignUpInputDTO {
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

    @IsNotEmpty({ message: 'Password should not be empty' })
    @IsString()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$#@!&*~])[A-Za-z\d$#@!&*~]{8,}$/, { message: 'Invalid password format' })
    password: string;

    @IsOptional()
    @IsBoolean()
    isDeveloper: boolean;

    @IsOptional()
    @IsBoolean()
    hasCompany: boolean;
};

export class UserSignUpAfterInviteDTO {
    @IsNotEmpty({ message: 'inviteId should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'inviteId should not contain only whitespace' })
    inviteId: string;

    @IsNotEmpty({ message: 'Password should not be empty' })
    @IsString()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$#@!&*~])[A-Za-z\d$#@!&*~]{8,}$/, { message: 'Invalid password format' })
    password: string;
};

export class UserSigninInputDTO {
    @IsNotEmpty({ message: 'Email should not be empty' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsNotEmpty({ message: 'Password should not be empty' })
    @IsString()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$#@!&*~])[A-Za-z\d$#@!&*~]{8,}$/, { message: 'Invalid password format' })
    password: string;
};

export class AdminSignUpInputDTO {
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

    @IsNotEmpty({ message: 'Password should not be empty' })
    @IsString()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$#@!&*~])[A-Za-z\d$#@!&*~]{8,}$/, { message: 'Invalid password format' })
    password: string;
};

export class AdminSignUpAfterInviteDTO {
    @IsNotEmpty({ message: 'inviteId should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'inviteId should not contain only whitespace' })
    inviteId: string;

    @IsNotEmpty({ message: 'Password should not be empty' })
    @IsString()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$#@!&*~])[A-Za-z\d$#@!&*~]{8,}$/, { message: 'Invalid password format' })
    password: string;
};

export class AdminSigninInputDTO {
    @IsNotEmpty({ message: 'Email should not be empty' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsNotEmpty({ message: 'Password should not be empty' })
    @IsString()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$#@!&*~])[A-Za-z\d$#@!&*~]{8,}$/, { message: 'Invalid password format' })
    password: string;

    @IsNotEmpty({ message: '2FA Code should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: '2FA Code should not contain only whitespace' })
    twoFACode: string;
};

