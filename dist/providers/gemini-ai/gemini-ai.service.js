"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiAIService = void 0;
const common_1 = require("@nestjs/common");
const generative_ai_1 = require("@google/generative-ai");
const rxjs_1 = require("rxjs");
const gemini_ai_run_entity_1 = require("./entities/gemini-ai-run.entity");
let GeminiAIService = class GeminiAIService {
    constructor(genAI) {
        this.genAI = genAI;
    }
    generateModel(geminiModel, context) {
        return this.genAI.getGenerativeModel({
            model: geminiModel,
            systemInstruction: context,
            generationConfig: { temperature: 1 },
        });
    }
    generateStructuredModel(geminiModel, context, schema) {
        return this.genAI.getGenerativeModel({
            model: geminiModel,
            systemInstruction: context,
            generationConfig: {
                temperature: 1,
                responseMimeType: 'application/json',
                responseSchema: schema,
            },
        });
    }
    handleStreamError(observer, run, message, statusCode) {
        run.setError(message);
        observer.error(JSON.stringify({
            error: {
                ok: false,
                message,
                statusCode,
            },
            metadata: run.finish(),
        }));
    }
    stream(query, geminiModel, contextInstructions) {
        const model = this.generateModel(geminiModel, contextInstructions);
        return new rxjs_1.Observable((observer) => {
            const run = new gemini_ai_run_entity_1.GeminiRunData();
            run.setInput(query);
            run.setModel(model.model);
            model
                .generateContentStream([query])
                .then(async (result) => {
                try {
                    for await (const chunk of result.stream) {
                        const text = chunk.text();
                        run.addChunk(text);
                        observer.next(text);
                    }
                    const response = await result.response;
                    run.setTokens(response.usageMetadata.totalTokenCount);
                    observer.next(JSON.stringify(run.finish()));
                    observer.complete();
                }
                catch (e) {
                    this.handleStreamError(observer, run, `Error en el flujo del stream: ${e.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                }
            })
                .catch((e) => {
                this.handleStreamError(observer, run, `Error en la llamada al modelo de Google: ${e.statusText || e.message}`, common_1.HttpStatus.SERVICE_UNAVAILABLE);
            });
        });
    }
    streamChatMessage(history, message, geminiModel, contextInstructions) {
        const model = this.generateModel(geminiModel, contextInstructions);
        const chat = model.startChat({ history });
        return new rxjs_1.Observable((observer) => {
            const run = new gemini_ai_run_entity_1.GeminiRunData();
            run.setInput(message);
            run.setModel(model.model);
            chat
                .sendMessageStream(message)
                .then(async (result) => {
                try {
                    for await (const chunk of result.stream) {
                        const text = chunk.text();
                        run.addChunk(text);
                        observer.next(text);
                    }
                    const response = await result.response;
                    run.setTokens(response.usageMetadata.totalTokenCount);
                    observer.next(JSON.stringify(run.finish()));
                    observer.complete();
                }
                catch (e) {
                    this.handleStreamError(observer, run, `Error en el flujo del stream: ${e.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                }
            })
                .catch((e) => {
                this.handleStreamError(observer, run, `Error en la llamada al modelo de Google: ${e.statusText || e.message}`, common_1.HttpStatus.SERVICE_UNAVAILABLE);
            });
        });
    }
    async getResponse(GeminiModel, context, query) {
        const model = this.generateModel(GeminiModel, context);
        const { response } = await model.generateContent(query);
        return response.text();
    }
    async getStructuredResponse(GeminiModel, context, query, schema) {
        const model = this.generateStructuredModel(GeminiModel, context, schema);
        const { response } = await model.generateContent(query);
        return response.text();
    }
};
exports.GeminiAIService = GeminiAIService;
exports.GeminiAIService = GeminiAIService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [generative_ai_1.GoogleGenerativeAI])
], GeminiAIService);
//# sourceMappingURL=gemini-ai.service.js.map