import { PrismaService } from 'src/providers/prisma/prisma.service';
import { SearchStatusQueryParamsDto } from '@common/query-params/search-status-query-params';
import { ReniecService } from '@providers/reniec/reniec.service';
import { IReniecResponse } from '@providers/reniec/interfaces/reniec-response.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
export declare class UsersService {
    private readonly db;
    private reniecService;
    constructor(db: PrismaService, reniecService: ReniecService);
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        created_at: Date;
        name: string;
        is_active: boolean;
        updated_at: Date;
        dni: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        modules_access: string[];
        last_name: string;
    }>;
    findAll({ query, page, page_size, status, }: SearchStatusQueryParamsDto): Promise<{
        data: {
            number: number;
            created_at: string;
            updated_at: string;
            id: string;
            name: string;
            is_active: boolean;
            dni: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
            modules_access: string[];
            last_name: string;
        }[];
        total: number;
        totalPages: number;
    }>;
    getOne(id: string): Promise<{
        id: string;
        created_at: Date;
        name: string;
        is_active: boolean;
        updated_at: Date;
        dni: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        modules_access: string[];
        last_name: string;
    }>;
    getOneByEmail(email: string): Promise<{
        id: string;
        created_at: Date;
        name: string;
        is_active: boolean;
        updated_at: Date;
        dni: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        modules_access: string[];
        last_name: string;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        actualUser: {
            id: string;
            created_at: Date;
            name: string;
            is_active: boolean;
            updated_at: Date;
            dni: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
            modules_access: string[];
            last_name: string;
        };
        updatedUser: {
            id: string;
            created_at: Date;
            name: string;
            is_active: boolean;
            updated_at: Date;
            dni: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
            modules_access: string[];
            last_name: string;
        };
    }>;
    updatePassword(id: string, dto: ChangePasswordDto): Promise<{
        actualUser: {
            id: string;
            created_at: Date;
            name: string;
            is_active: boolean;
            updated_at: Date;
            dni: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
            modules_access: string[];
            last_name: string;
        };
        updatedUser: {
            id: string;
            created_at: Date;
            name: string;
            is_active: boolean;
            updated_at: Date;
            dni: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
            modules_access: string[];
            last_name: string;
        };
    }>;
    remove(id: string): Promise<{
        id: string;
        created_at: Date;
        name: string;
        is_active: boolean;
        is_archived: boolean;
        updated_at: Date;
        dni: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        modules_access: string[];
        last_name: string;
    }>;
    verifyDni(dni: string): Promise<IReniecResponse>;
}
