import { IUserSession } from '@modules/auth/interfaces/user-session.interface';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DocumentsService } from '../documents.service';
import { CreateDocumentDto } from '../dto/create-document.dto';
export declare class DocumentsInTopicController {
    private readonly documentsService;
    private readonly eventEmitter;
    constructor(documentsService: DocumentsService, eventEmitter: EventEmitter2);
    createDocument(session: IUserSession, topicId: string, createDocumentDto: CreateDocumentDto, file: Express.Multer.File): Promise<{
        id: string;
        description: string;
        created_at: Date;
        name: string;
        tags: string[];
        is_active: boolean;
        is_archived: boolean;
        updated_at: Date;
        url: string;
        topic_id: string;
        size: import("@prisma/client/runtime/library").Decimal;
    }>;
    getAllDocumentsByTopic(topicId: string): Promise<{
        name: string;
        url: string;
    }[]>;
}
