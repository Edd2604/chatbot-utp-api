import { IUserSession } from '@modules/auth/interfaces/user-session.interface';
import { Entity } from '@prisma/client';
export interface EntityOperationEvent {
    session: IUserSession;
    entity: Entity;
    entityId: string;
    before?: any;
    after?: any;
}
export declare enum LoggerEvents {
    ENTITY_CREATED_EVENT = "entity.created",
    ENTITY_UPDATED_EVENT = "entity.updated",
    ENTITY_ARCHIVED_EVENT = "entity.archived"
}
