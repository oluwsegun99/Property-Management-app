import { IsString, IsNotEmpty, IsOptional, Matches, IsNumber, IsDate, IsBoolean, ValidateNested, IsArray, ArrayNotEmpty, ArrayMinSize } from 'class-validator';

export class CreateProjectMediaDTO {
    @IsNotEmpty({ message: 'Project media category ID should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Project media category ID should not contain only whitespace' })
    projectMediaCategoryId: string;

    @IsNotEmpty({ message: 'Media URL should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Media URL should not contain only whitespace' })
    mediaUrl: string;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Description should not contain only whitespace' })
    description?: string;

    @IsOptional()
    @IsNumber()
    @Matches(/^\s*\S.*$/, { message: 'Index should not contain only whitespace' })
    index?: number;
};

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
    @IsNumber()
    projectStatusId: number;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Developer company ID should not contain only whitespace' })
    developerCompanyId?: string;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Neighborhood ID should not contain only whitespace' })
    neighborhoodId?: string;

    @IsOptional()
    @IsArray()
    @ArrayNotEmpty({ message: 'Property Media should not be empty' })
    @ArrayMinSize(1, { message: 'Property Media should contain at least one item' })
    projectMedia?: CreateProjectMediaDTO[];
}

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

    @IsOptional()
    @IsArray()
    @ArrayNotEmpty({ message: 'Property Media should not be empty' })
    @ArrayMinSize(1, { message: 'Property Media should contain at least one item' })
    projectMedia?: CreateProjectMediaDTO[];
};

export class CreatePrototypeMediaDTO {
    @IsNotEmpty({ message: 'Property media category ID should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Property media category ID should not contain only whitespace' })
    propertyMediaCategoryId: string;

    @IsOptional()
    @IsNumber()
    @Matches(/^\s*\S.*$/, { message: 'Index should not contain only whitespace' })
    index?: number;

    @IsNotEmpty({ message: 'Media URL should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Media URL should not contain only whitespace' })
    mediaUrl: string;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Description should not contain only whitespace' })
    description?: string;
}

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
    @IsArray()
    @ArrayNotEmpty({ message: 'Prototype Media should not be empty' })
    @ArrayMinSize(1, { message: 'Prototype Media should contain at least one item' })
    prototypeMedia?: CreatePrototypeMediaDTO[];
}

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

export class CreatePropertyMediaDTO {
    @IsOptional()
    @IsNumber()
    @Matches(/^\s*\S.*$/, { message: 'Index should not contain only whitespace' })
    index?: number;

    @IsNotEmpty({ message: 'Media URL should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Media URL should not contain only whitespace' })
    mediaUrl: string;

    @IsNotEmpty({ message: 'Media category ID should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Media category ID should not contain only whitespace' })
    mediaCategoryId: string;

    @IsOptional()
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Description should not contain only whitespace' })
    description?: string;
}

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

export class CreatePropertyPurchaseRequestDTO {
    @IsNotEmpty({ message: 'Property ID should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Property ID should not contain only whitespace' })
    propertyId: string;

    @IsNotEmpty({ message: 'Request date should not be empty' })
    @IsDate()
    requestDate: Date;

    @IsNotEmpty({ message: 'Purchase request type ID should not be empty' })
    @IsNumber()
    purchaseRequestTypeId: number;

    @IsOptional()
    @IsNumber()
    durationTypeId?: number;

    @IsOptional()
    @IsNumber()
    purchaseDuration?: number;
}

export class UpdatePropertyPurchaseRequestDTO {
    @IsNotEmpty({ message: 'Purchase request ID should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Purchase request ID should not contain only whitespace' })
    purchaseRequestId: string;

    @IsOptional()
    @IsDate()
    requestDate?: Date;

    @IsOptional()
    @IsNumber()
    purchaseRequestTypeId?: number;

    @IsOptional()
    @IsNumber()
    durationTypeId?: number;

    @IsOptional()
    @IsNumber()
    purchaseDuration?: number;
}

export class ApprovePurchaseRequestDTO {
    @IsNotEmpty({ message: 'Purchase request ID should not be empty' })
    @IsString()
    @Matches(/^\s*\S.*$/, { message: 'Purchase request ID should not contain only whitespace' })
    purchaseRequestId: string;

    @IsNotEmpty({ message: 'Purchase request status ID should not be empty' })
    @IsNumber()
    purchaseRequestStatusId: number;
}