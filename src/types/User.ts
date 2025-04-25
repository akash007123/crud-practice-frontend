export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    jobTitle?: string;
    gender: string;
    profileImage?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface UserFormData {
    firstName: string;
    lastName: string;
    email: string;
    jobTitle?: string;
    gender: string;
    profileImage?: File;
}