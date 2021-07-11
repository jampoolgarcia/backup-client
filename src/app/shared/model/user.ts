export interface UserI {
    id?: string;
    firstName: string;
    lastName: string;
    userName: string;
    password?: string;
    role?: number;
    isActive?: boolean;
    questions?: number[];
    replies?: string[];
}
