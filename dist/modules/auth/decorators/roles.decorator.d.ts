import { Role } from '@prisma/client';
export declare const ROLES_KEY = "ROLES";
export declare const Roles: (role: Role[]) => import("@nestjs/common").CustomDecorator<string>;
