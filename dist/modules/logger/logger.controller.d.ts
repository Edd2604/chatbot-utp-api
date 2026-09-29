import { LoggerService } from './logger.service';
import { LogsQueryParams } from './query-params/logs-query-params';
export declare class LoggerController {
    private readonly logger;
    constructor(logger: LoggerService);
    findAll(query: LogsQueryParams): Promise<{
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
}
