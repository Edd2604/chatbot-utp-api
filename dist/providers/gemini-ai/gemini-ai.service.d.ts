import { GenerateContentRequest, GoogleGenerativeAI, Part } from '@google/generative-ai';
import { Observable } from 'rxjs';
import { Schema } from '@google/generative-ai';
import { GeminiModels } from './interfaces/gemini-ai-models.enum';
import { IGeminiMessageChat } from './interfaces/gemini-ai-historial.interface';
export declare class GeminiAIService {
    private readonly genAI;
    constructor(genAI: GoogleGenerativeAI);
    private generateModel;
    private generateStructuredModel;
    private handleStreamError;
    stream(query: string, geminiModel: GeminiModels, contextInstructions: string): Observable<string>;
    streamChatMessage(history: IGeminiMessageChat[], message: string, geminiModel: GeminiModels, contextInstructions: string): Observable<string>;
    getResponse(GeminiModel: GeminiModels, context: string, query: GenerateContentRequest | string | Array<string | Part>): Promise<string>;
    getStructuredResponse(GeminiModel: GeminiModels, context: string, query: GenerateContentRequest | string | Array<string | Part>, schema: Schema): Promise<string>;
}
