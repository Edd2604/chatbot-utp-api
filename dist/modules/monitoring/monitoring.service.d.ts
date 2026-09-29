import { GeminiAIService } from '@providers/gemini-ai/gemini-ai.service';
import { PrismaService } from '@providers/prisma/prisma.service';
export declare class MonitoringService {
    private readonly db;
    private readonly ai;
    constructor(db: PrismaService, ai: GeminiAIService);
    getRunsAnalytics(): Promise<{
        date: string;
        ok: number;
        error: number;
    }[]>;
    getTokensPerMonth(): Promise<{
        month: string;
        totalTokens: number;
    }[]>;
    getTopInputs(): Promise<any>;
}
