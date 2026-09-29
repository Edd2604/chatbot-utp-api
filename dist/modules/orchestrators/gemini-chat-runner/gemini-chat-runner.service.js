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
exports.GeminiChatRunnerService = void 0;
const common_1 = require("@nestjs/common");
const gemini_ai_service_1 = require("../../../providers/gemini-ai/gemini-ai.service");
const rxjs_1 = require("rxjs");
const event_emitter_1 = require("@nestjs/event-emitter");
const gemini_ai_run_entity_1 = require("../../../providers/gemini-ai/entities/gemini-ai-run.entity");
const gemini_ai_models_enum_1 = require("../../../providers/gemini-ai/interfaces/gemini-ai-models.enum");
const runs_service_1 = require("../../runs/runs.service");
const run_events_interfaces_1 = require("../../events/run-events/run-events.interfaces");
const documents_service_1 = require("../../documents/documents.service");
const pusher_service_1 = require("../../../providers/pusher/pusher.service");
const conversations_service_1 = require("../../conversations/conversations.service");
const instructions_const_1 = require("./prompts/instructions.const");
let GeminiChatRunnerService = class GeminiChatRunnerService {
    constructor(ai, eventEmitter, runService, documentService, pusherService, conversationService) {
        this.ai = ai;
        this.eventEmitter = eventEmitter;
        this.runService = runService;
        this.documentService = documentService;
        this.pusherService = pusherService;
        this.conversationService = conversationService;
    }
    streamChatResponse(conversation_id, message, topic_id) {
        return new rxjs_1.Observable((subscriber) => {
            this.runService
                .getConversationContext(conversation_id)
                .then(async (result) => {
                const historial = this.mapRunsToHistory(result);
                if (historial.length > 0) {
                    await this.conversationService.validateActive(conversation_id);
                }
                if (topic_id) {
                    const documents = await this.documentService.getAvailablesByTopic(topic_id);
                    const documentParts = await this.extractDocumentsContext(documents);
                    historial.unshift(...documentParts);
                }
                const stream = this.ai.streamChatMessage(historial, message, gemini_ai_models_enum_1.GeminiModels.GEMINI_2_0_FLASH, instructions_const_1.ASSISTANT_INSTRUCTION);
                let previousChunk = null;
                let lastChunk = null;
                stream.subscribe({
                    next: (data) => {
                        if (previousChunk !== null)
                            subscriber.next(previousChunk);
                        previousChunk = data;
                        lastChunk = data;
                    },
                    error: async (e) => {
                        const { metadata, error } = JSON.parse(e);
                        this.handleRunExecutedEvent(metadata, conversation_id);
                        await this.reportError(error.message);
                        subscriber.error(error);
                    },
                    complete: async () => {
                        const metadata = JSON.parse(lastChunk);
                        const title = await this.handleRunExecutedEvent(metadata, conversation_id);
                        subscriber.next(JSON.stringify({ title: title }));
                        subscriber.complete();
                    },
                });
            })
                .catch(async (e) => {
                await this.reportError(e.message);
                subscriber.error(e);
            });
        });
    }
    async handleRunExecutedEvent(GeminiRunMetaDataRaw, conversation_id) {
        const metadata = Object.assign(new gemini_ai_run_entity_1.GeminiRunData(), GeminiRunMetaDataRaw);
        const dto = metadata.toCreateDto(conversation_id);
        const runExecutedEvent = {
            ...dto,
        };
        const title = await this.eventEmitter.emitAsync(run_events_interfaces_1.RUN_EVENTS.ON_RUN_EXECUTED_EVENT, runExecutedEvent);
        return title;
    }
    mapRunsToHistory(runs) {
        const historial = runs.flatMap((run) => [
            {
                role: 'user',
                parts: [{ text: run.input }],
            },
            {
                role: 'model',
                parts: [{ text: run.output }],
            },
        ]);
        return historial;
    }
    async extractDocumentsContext(documents) {
        const contextParts = [];
        for (const doc of documents) {
            try {
                const buffer = await fetch(doc.url).then((res) => res.arrayBuffer());
                contextParts.push({
                    role: 'user',
                    parts: [
                        {
                            text: `Por favor, responde teniendo en cuenta este documento y en base a la siguiente pregunta del usuario: ${doc.name}`,
                        },
                        {
                            inlineData: {
                                mimeType: 'application/pdf',
                                data: Buffer.from(buffer).toString('base64'),
                            },
                        },
                    ],
                });
            }
            catch (e) {
                console.error(`Error al procesar PDF: ${doc.url}`, e);
                throw new common_1.InternalServerErrorException(`Error en el procesamiento de documentos: ${doc.name}`);
            }
        }
        return contextParts;
    }
    async reportError(error) {
        await this.pusherService.trigger('chat-monitor', 'chatbot-error', {
            error,
            timestamp: new Date().toISOString(),
        });
    }
};
exports.GeminiChatRunnerService = GeminiChatRunnerService;
exports.GeminiChatRunnerService = GeminiChatRunnerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [gemini_ai_service_1.GeminiAIService,
        event_emitter_1.EventEmitter2,
        runs_service_1.RunsService,
        documents_service_1.DocumentsService,
        pusher_service_1.PusherService,
        conversations_service_1.ConversationsService])
], GeminiChatRunnerService);
//# sourceMappingURL=gemini-chat-runner.service.js.map