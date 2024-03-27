import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional, Matches, IsNumber, IsDate, IsBoolean, ValidateNested, IsArray, ArrayNotEmpty, ArrayMinSize } from 'class-validator';

export class CreateProjectDTO {
    @IsNotEmpty({ message: 'Project name should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Project name should not contain only whitespace' })
    projectName: string;

    @IsNotEmpty({ message: 'Description should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Description should not contain only whitespace' })
    description: string;

    @IsNotEmpty({ message: 'Address should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Address should not contain only whitespace' })
    address: string;

    @IsNotEmpty({ message: 'City ID should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'City ID should not contain only whitespace' })
    cityId: string;

    @IsNotEmpty({ message: 'Project status ID should not be empty' })
    @IsNumber({}, { message: 'Invalid project status ID' })
    projectStatusId: number;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Developer CompanyId ID should not contain only whitespace' })
    developerCompanyId?: string;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Project layout URL should not contain only whitespace' })
    projectLayoutUrl?: string;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Neighborhood ID should not contain only whitespace' })
    neighborhoodId?: string;
};

export class UpdateProjectDTO {
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Project ID should not contain only whitespace' })
    projectId: string;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Project name should not contain only whitespace' })
    projectName?: string;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Description should not contain only whitespace' })
    description?: string;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Address should not contain only whitespace' })
    address?: string;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Project layout URL should not contain only whitespace' })
    projectLayoutUrl?: string;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'City ID should not contain only whitespace' })
    cityId?: string;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Neighborhood ID should not contain only whitespace' })
    neighborhoodId?: string;

    @IsOptional()
    @IsNumber({}, { message: 'Invalid project status ID' })
    projectStatusId?: number;
};

export class CreatePrototypeDTO {
    @IsNotEmpty({ message: 'Prototype name should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Prototype name should not contain only whitespace' })
    prototypeName: string;

    @IsNotEmpty({ message: 'Description should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Description should not contain only whitespace' })
    description: string;

    @IsNotEmpty({ message: 'Project ID should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Project ID should not contain only whitespace' })
    projectId: string;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Category ID should not contain only whitespace' })
    categoryId?: string;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Media URL should not contain only whitespace' })
    mediaUrl?: string;
};

export class UpdatePrototypeDTO {
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Prototype ID should not contain only whitespace' })
    prototypeId: string;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Prototype name should not contain only whitespace' })
    prototypeName?: string;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Description should not contain only whitespace' })
    description?: string;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Category ID should not contain only whitespace' })
    categoryId?: string;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Media URL should not contain only whitespace' })
    mediaUrl?: string;
};

export class CreatePropertyDetailsDTO {
    @IsNotEmpty({ message: 'Address should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Address should not contain only whitespace' })
    address: string;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Longitude should not contain only whitespace' })
    longitude?: string;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Latitude should not contain only whitespace' })
    latitude?: string;

    @IsNotEmpty({ message: 'Bedrooms should not be empty' })
    @IsNumber()
    bedrooms: number;

    @IsNotEmpty({ message: 'Bathrooms should not be empty' })
    @IsNumber()
    bathrooms: number;

    @IsNotEmpty({ message: 'Toilets should not be empty' })
    @IsNumber()
    toilets: number;

    @IsOptional()
    @IsNumber()
    floors?: number;

    @IsNotEmpty({ message: 'SizeSqft should not be empty' })
    @IsNumber()
    sizeSqft: number;

    @IsNotEmpty({ message: 'Date completed should not be empty' })
    @IsDate()
    dateCompleted: Date;

    @IsNotEmpty({ message: 'Parking spaces should not be empty' })
    @IsNumber()
    parkingSpaces: number;

    @IsOptional()
    @IsBoolean()
    isFurnished?: boolean;

    @IsOptional()
    @IsBoolean()
    hasPool?: boolean;

    @IsOptional()
    @IsBoolean()
    hasGarden?: boolean;

    @IsOptional()
    @IsBoolean()
    isNewConstruction?: boolean;

    @IsOptional()
    @IsBoolean()
    canPayInstallment?: boolean;

    @IsOptional()
    @IsBoolean()
    canMortgage?: boolean;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Neighborhood ID should not contain only whitespace' })
    neighborhoodId?: string;

    @IsNotEmpty({ message: 'Property option ID should not be empty' })
    @IsNumber()
    propertyOptionId: number;
};

export class MediaUrlItem {
    @Matches(/^\s*\S.*$/, { message: 'Media URL should not contain only whitespace' })
    mediaUrl: string;
}

export class CreatePropertyMediaDTO {
    @IsOptional()
    @IsNumber()
    index?: number;

    @IsArray()
    @ArrayNotEmpty({ message: 'Property Media should not be empty' })
    @ArrayMinSize(1, { message: 'Property Media should contain at least one item' })
    @ValidateNested({ each: true })
    @Type(() => MediaUrlItem)
    mediaUrl?: MediaUrlItem[];

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Description should not contain only whitespace' })
    description?: string;
};

export class CreatePropertyDTO {
    @IsNotEmpty({ message: 'Name should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Name should not contain only whitespace' })
    name: string;

    @IsNotEmpty({ message: 'Description should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Description should not contain only whitespace' })
    description: string;

    @IsNotEmpty({ message: 'Price should not be empty' })
    @IsNumber()
    price: number;

    @IsNotEmpty({ message: 'Category ID should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Category ID should not contain only whitespace' })
    categoryId: string;

    @IsNotEmpty({ message: 'Property status ID should not be empty' })
    @IsNumber()
    propertyStatusId: number;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Project ID should not contain only whitespace' })
    projectId?: string;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Prototype ID should not contain only whitespace' })
    prototypeId?: string;

    @IsNotEmpty({ message: 'City ID should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'City ID should not contain only whitespace' })
    cityId: string;

    @IsNotEmpty({ message: 'Developer Company ID should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Developer Company ID should not contain only whitespace' })
    developerCompanyId?: string

    @IsNotEmpty({ message: 'Property detail should not be empty' })
    propertyDetail: CreatePropertyDetailsDTO;

    @IsOptional()
    @IsArray()
    @ArrayNotEmpty({ message: 'Property Media should not be empty' })
    @ArrayMinSize(1, { message: 'Property Media should contain at least one item' })
    propertyMedia?: CreatePropertyMediaDTO[];
};