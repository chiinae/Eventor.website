export interface User {
    _id: string;
    username: string;
    email: string;
    role: string;
    membershipType: string;
    eventsJoined: string[];
    eventsCreated: string[];
    first_name: string;
    last_name: string;
    phone_number: string;
    gender: string;
    status: string;
    createdAt: Date;
    ServiceID?: string;
    package_id?: string;
    dob?: Date;
    Create_At?: Date;
    avatar?: string;
    total_expenditure?: number;
}

export interface UserStats {
    totalEvents: number;
    totalSpent: number;
    memberSince: Date;
    lastLogin: Date;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    user?: User;
    data?: T;
}