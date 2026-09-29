import { PrismaService } from '@providers/prisma/prisma.service';
import { CloudinaryService } from '@providers/cloudinary/cloudinary.service';
import { SearchStatusQueryParamsDto } from '@common/query-params/search-status-query-params';
import { Prisma } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
export declare class DocumentsService {
    private readonly eventEmitter;
    private readonly db;
    private readonly cloudinary;
    constructor(eventEmitter: EventEmitter2, db: PrismaService, cloudinary: CloudinaryService);
    create(createDocumentDto: CreateDocumentDto, file: Express.Multer.File): Promise<{
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
        size: Prisma.Decimal;
    }>;
    getAll({ page, page_size, status, query }: SearchStatusQueryParamsDto): Promise<{
        data: {
            number: number;
            created_at: string;
            updated_at: string;
            id: string;
            description: string;
            name: string;
            tags: string[];
            is_active: boolean;
            is_archived: boolean;
            url: string;
            topic_id: string;
            size: Prisma.Decimal;
        }[];
        total: number;
        totalPages: number;
    }>;
    getAvailablesByTopic(topicId: string): Promise<{
        name: string;
        url: string;
    }[]>;
    getOne(id: string): Promise<{
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
        size: Prisma.Decimal;
    }>;
    update(id: string, updateDocumentDto: UpdateDocumentDto): Promise<{
        actualDocument: {
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
            size: Prisma.Decimal;
        };
        updatedDocument: {
            id: string;
            description: string;
            created_at: Date;
            name: string;
            tags: string[];
            is_active: boolean;
            updated_at: Date;
            url: string;
            topic_id: string;
            size: Prisma.Decimal;
        };
    }>;
    remove(id: string): Promise<{
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
        size: Prisma.Decimal;
    }>;
}
