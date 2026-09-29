import { GoogleGenerativeAI } from '@google/generative-ai';
export declare const GeminiProvider: {
    provide: typeof GoogleGenerativeAI;
    useFactory: () => GoogleGenerativeAI;
};
