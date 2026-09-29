import { PrismaService } from '@providers/prisma/prisma.service';
import { IUserSession } from '@auth/interfaces/user-session.interface';
import { Entity } from '@prisma/client';
import { LogsQueryParams } from './query-params/logs-query-params';
export declare class LoggerService {
    private readonly db;
    constructor(db: PrismaService);
    getAll({ page, page_size, logAction }: LogsQueryParams): Promise<{
        data: {
            created_at: string;
            id: number;
            user_id: string;
            action: import(".prisma/client").$Enums.Action;
            entity: import(".prisma/client").$Enums.Entity;
            entity_id: string;
            details: import("@prisma/client/runtime/library").JsonValue | null;
        }[];
        total: number;
        totalPages: number;
    }>;
    createEntityLog(user: IUserSession, entity: Entity, entity_id: string): Promise<void>;
    updateEntityLog(user: IUserSession, entity: Entity, entity_id: string, after?: any, before?: any): Promise<void>;
    deleteEntityLog(user: IUserSession, entity: Entity, entity_id: string): Promise<void>;
}
