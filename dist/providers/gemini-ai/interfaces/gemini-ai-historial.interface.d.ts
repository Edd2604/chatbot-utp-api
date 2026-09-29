import { Part } from '@google/generative-ai';
export interface IGeminiMessagePart {
    text: string;
}
export interface IGeminiMessageChat {
    role: 'user' | 'model';
    parts: Part[];
}
