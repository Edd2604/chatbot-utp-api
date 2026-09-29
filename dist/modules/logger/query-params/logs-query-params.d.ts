import { PaginatedParamsDto } from '@common/query-params/paginated-params';
import { Action } from '@prisma/client';
export declare class LogsQueryParams extends PaginatedParamsDto {
    logAction: Action;
}
