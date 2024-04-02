export enum InspectionType {
    InPerson = "InPerson",
    Virtual = "Virtual"
};

export enum InspectionStatusEnum {
    PendingApproval = 1,
    Rejected = 2,
    RequestedChanges = 3,
    // AgentApproved = 4,
    Approved = 4,
    Missed = 5,
    Completed = 6
}

export enum InspectionStatus {
    PendingApproval = "PendingApproval",
    Rejected = "Rejected",
    RequestedChanges = "RequestedChanges",
    // AgentApproved = "AgentApproved",
    Approved = "Approved",
    Missed = "Missed",
    Completed = "Completed"
};