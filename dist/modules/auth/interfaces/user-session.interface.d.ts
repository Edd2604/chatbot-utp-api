import { Role } from '@prisma/client';
export interface IUserSession {
    id: string;
    username: string;
    email: string;
    role: Role;
    modules: string[];
    iat?: number;
    exp?: number;
}
