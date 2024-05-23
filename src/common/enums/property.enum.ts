export enum PropertyStatus {
    Completed = "Completed",
    Rented = "Rented",
    Mortgaged = "Mortgaged",
    Sold = "Sold"
};

export enum PropertyStatusEnum {
    Completed = 1,
    Rented = 2,
    Mortgaged = 3,
    Sold = 4
};

export enum PropertyOption {
    forSale = "For Sale",
    toRent = "To Rent",
    taken = "Taken"
};

export enum PropertyOptionEnum {
    forSale = 1,
    toRent = 2,
    taken = 3
};

export enum ProjectStatus {
    Draft = "Draft",
    Approved = "Approved",
    Rejected = "Rejected",
    PendingApproval = "PendingApproval",
    RequestedChanges = "RequestedChanges"
};

export enum ProjectStatusEnum {
    Draft = 1,
    Approved = 2,
    Rejected = 3,
    PendingApproval = 4,
    RequestedChanges = 5
};

export enum RequestUpdateStatus {
    Pending = "Pending",
    Approved = "Approved",
    Declined = "Declined",
    Closed = "Closed"
};

export enum RequestUpdateStatusEnum {
    Pending = 1,
    Approved = 2,
    Declined = 3,
    Closed = 4
};

export enum PurchaseRequestType {
    FullPayment = "FullPayment",
    MortgagePayment = "MortgagePayment",
    Rent = "Rent"
};

export enum PurchaseRequestTypeEnum {
    FullPayment = 1,
    MortgagePayment = 2,
    Rent = 3
};

export enum DurationType {
    Monthly = "Monthly",
    Yearly = "Yearly"
};

export enum DurationTypeEnum {
    Monthly = 1,
    Yearly = 2
};

export enum PurchaseRequestStatus {
    Pending = "Pending",
    Approved = "Approved",
    Rejected = "Rejected"
};

export enum PurchaseRequestStatusEnum {
    Pending = 1,
    Approved = 2,
    Rejected = 3
}

export enum PropertyCategory {
    Bungalow = 'Bungalow',
    Duplex = 'Duplex',
    Apartment = 'Apartment',
    Townhouse = 'Townhouse',
    Mansion = 'Mansion',
    Cottage = 'Cottage',
    Villa = 'Villa',
    Condo = 'Condo',
    Penthouse = 'Penthouse',
    Studio = 'Studio'
};

export enum PropertyMediaCategory {
    Banner = "Banner",
    LivingRoom = "LivingRoom",
    Bedroom = "Bedroom",
    Bathroom = "Bathroom",
    Kitchen = "Kitchen",
    Other = "Other"
};

export enum ProjectMediaCategory {
    Banner = "Banner",
    PerspectiveOne = "PerspectiveOne",
    PerspectiveTwo = "PerspectiveTwo",
    Other = "Other"
}

export const PROPERTY_MEDIA_CATEGORY: { mediaCategory: string, required: boolean }[] = [
    { mediaCategory: PropertyMediaCategory.Banner, required: true },
    { mediaCategory: PropertyMediaCategory.LivingRoom, required: true },
    { mediaCategory: PropertyMediaCategory.Bedroom, required: true },
    { mediaCategory: PropertyMediaCategory.Bathroom, required: true },
    { mediaCategory: PropertyMediaCategory.Kitchen, required: false },
    { mediaCategory: PropertyMediaCategory.Other, required: false }
];

export const PROJECT_MEDIA_CATEGORY: { mediaCategory: string, required: boolean }[] = [
    { mediaCategory: ProjectMediaCategory.Banner, required: true },
    { mediaCategory: ProjectMediaCategory.PerspectiveOne, required: true },
    { mediaCategory: ProjectMediaCategory.PerspectiveTwo, required: true },
    { mediaCategory: ProjectMediaCategory.Other, required: false },
];