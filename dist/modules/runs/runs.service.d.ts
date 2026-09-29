import { PrismaService } from 'src/providers/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateRunDto } from './dto/create-run.dto';
import { RunQueryParams } from './query-params/runs-query-params';
export declare class RunsService {
    private readonly db;
    constructor(db: PrismaService);
    create(createRunDto: CreateRunDto): Promise<{
        error: string | null;
        conversation_id: string;
        is_run_successful: boolean;
        model_llm: string;
        latency: Prisma.Decimal;
        tokens: number;
        input: string;
        output: string;
        id: string;
        created_at: Date;
    }>;
    getAll({ start_date, end_date, page, page_size, error, query, }: RunQueryParams): Promise<{
        data: {
            number: number;
            created_at: string;
            error: string | null;
            conversation_id: string;
            is_run_successful: boolean;
            model_llm: string;
            latency: Prisma.Decimal;
            tokens: number;
            input: string;
            output: string;
            id: string;
        }[];
        total: number;
        totalPages: number;
    }>;
    getAllByConversation(conversationId: string): Promise<{
        error: string | null;
        conversation_id: string;
        is_run_successful: boolean;
        model_llm: string;
        latency: Prisma.Decimal;
        tokens: number;
        input: string;
        output: string;
        id: string;
        created_at: Date;
    }[]>;
    getConversationContext(conversationId: string): Promise<{
        input: string;
        output: string;
    }[]>;
    getOne(runId: string): Promise<{
        error: string | null;
        conversation_id: string;
        is_run_successful: boolean;
        model_llm: string;
        latency: Prisma.Decimal;
        tokens: number;
        input: string;
        output: string;
        id: string;
        created_at: Date;
    }>;
}
