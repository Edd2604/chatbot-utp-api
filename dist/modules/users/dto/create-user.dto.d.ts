import { Role } from '@prisma/client';
export declare class CreateUserDto {
    dni: string;
    email: string;
    password: string;
    is_active?: boolean;
    role: Role;
    modules_access: string[];
}
