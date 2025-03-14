export interface User {
    _id: string;
    ServiceID: string;
    package_id: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    dob: Date;
    phone_number: string;
    gender: string;
    role: string;
    Create_At: Date;
    avatar: string;
    status: string;
    total_expenditure: number;
    membershipType?: string;
    membershipExpiry?: string;
    eventsJoined?: number;
    eventsCreated?: number;
}

export interface UserStats {
    membershipTier: string;
    expiryDate: Date;
    eventsAttended: number;
    eventsCreated: number;
    accountCreated: Date;
    totalLogins?: number;
    lastLogin?: Date;
}