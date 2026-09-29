import { RunsService } from '../runs.service';
import { RunQueryParams } from '../query-params/runs-query-params';
export declare class RunsController {
    private readonly runsService;
    constructor(runsService: RunsService);
    getAllruns(query: RunQueryParams): Promise<{
        data: {
            number: number;
            created_at: string;
            error: string | null;
            conversation_id: string;
            is_run_successful: boolean;
            model_llm: string;
            latency: import("@prisma/client/runtime/library").Decimal;
            tokens: number;
            input: string;
            output: string;
            id: string;
        }[];
        total: number;
        totalPages: number;
    }>;
    getRun(id: string): Promise<{
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
    }>;
}
