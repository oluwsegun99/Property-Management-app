export enum PropertyStatus {
    Completed = "Completed",
    Rented = "Rented",
    Mortgaged = "Mortgaged",
    Sold = "Sold"
};

export enum PropertyOption {
    forSale = "For Sale",
    toRent = "To Rent",
    taken = "Taken"
};

export enum ProjectStatus {
    Draft = "Draft",
    Approved = "Approved",
    Rejected = "Rejected",
    PendingApproval = "PendingApproval",
    RequestedChanges = "RequestedChanges"
};

export enum RequestUpdateStatus {
    Pending = "Pending",
    Approved = "Approved",
    Declined = "Declined",
    Closed = "Closed"
};

export enum PurchaseRequestType {
    FullPayment = "FullPayment",
    MortgagePayment = "MortgagePayment",
    Rent = "Rent"
};

export enum DurationType {
    Monthly = "Monthly",
    Yearly = "Yearly"
};

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