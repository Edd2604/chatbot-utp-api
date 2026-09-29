import { ConversationsService } from './conversations.service';
import { ConversationsQueryParams } from './query-params/conversations-query-params';
export declare class ConversationsController {
    private readonly conversationsService;
    constructor(conversationsService: ConversationsService);
    getAllConversations(query: ConversationsQueryParams): Promise<{
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
    getConversation(id: string): Promise<{
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
    closeConversation(id: string): Promise<{
        id: string;
        title: string | null;
        created_at: Date;
        completed_at: Date | null;
        last_run: Date | null;
        total_runs: number;
        total_tokens: number;
        status: import(".prisma/client").$Enums.ConversationStatus;
    }>;
}
