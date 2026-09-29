import { PrismaService } from 'src/providers/prisma/prisma.service';
import { GeminiAIService } from '@providers/gemini-ai/gemini-ai.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { ConversationsQueryParams } from './query-params/conversations-query-params';
export declare class ConversationsService {
    private readonly db;
    private readonly ai;
    constructor(db: PrismaService, ai: GeminiAIService);
    create(createConversationDto: CreateConversationDto): Promise<{
        id: string;
        title: string | null;
        created_at: Date;
        completed_at: Date | null;
        last_run: Date | null;
        total_runs: number;
        total_tokens: number;
        status: import(".prisma/client").$Enums.ConversationStatus;
    }>;
    getAll({ page, page_size, start_date, end_date, conversationStatus, }: ConversationsQueryParams): Promise<{
        data: {
            number: number;
            created_at: string;
            last_run: string;
            completed_at: string;
            id: string;
            title: string | null;
            total_runs: number;
            total_tokens: number;
            status: import(".prisma/client").$Enums.ConversationStatus;
        }[];
        total: number;
        totalPages: number;
    }>;
    getOneWithRuns(id: string): Promise<{
        runs: {
            error: string | null;
            conversation_id: string;
            is_run_successful: boolean;
            model_llm: string;
            latency: import("@prisma/client/runtime/library").Decimal;
            tokens: number;
            input: string;
            output: string;
            id: string;
            created_at: Date;
        }[];
    } & {
        id: string;
        title: string | null;
        created_at: Date;
        completed_at: Date | null;
        last_run: Date | null;
        total_runs: number;
        total_tokens: number;
        status: import(".prisma/client").$Enums.ConversationStatus;
    }>;
    getOne(conversationId: string): Promise<{
        id: string;
        title: string | null;
        created_at: Date;
        completed_at: Date | null;
        last_run: Date | null;
        total_runs: number;
        total_tokens: number;
        status: import(".prisma/client").$Enums.ConversationStatus;
    }>;
    update(conversationId: string, tokens: number): Promise<{
        id: string;
        title: string | null;
        created_at: Date;
        completed_at: Date | null;
        last_run: Date | null;
        total_runs: number;
        total_tokens: number;
        status: import(".prisma/client").$Enums.ConversationStatus;
    }>;
    close(conversationId: string): Promise<{
        id: string;
        title: string | null;
        created_at: Date;
        completed_at: Date | null;
        last_run: Date | null;
        total_runs: number;
        total_tokens: number;
        status: import(".prisma/client").$Enums.ConversationStatus;
    }>;
    validateActive(conversationId: string): Promise<void>;
}
