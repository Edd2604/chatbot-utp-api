import { CreateRunDto } from '@modules/runs/dto/create-run.dto';
import { IGeminiRunData } from '../interfaces/gemini-ai-entity.interface';
export declare class GeminiRunData implements IGeminiRunData {
    input: string;
    output: string;
    tokens: number;
    model: string;
    latency: number;
    error: string | null;
    private startTime;
    constructor();
    setInput(input: string): void;
    setModel(model: string): void;
    addChunk(text: string): void;
    setTokens(count: number): void;
    setError(message: string): void;
    finish(): this;
    toCreateDto(conversationId: string): CreateRunDto;
}
