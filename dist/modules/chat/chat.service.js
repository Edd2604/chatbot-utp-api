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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const gemini_chat_runner_service_1 = require("../orchestrators/gemini-chat-runner/gemini-chat-runner.service");
const runs_service_1 = require("../runs/runs.service");
let ChatService = class ChatService {
    constructor(geminiRunner, runsService) {
        this.geminiRunner = geminiRunner;
        this.runsService = runsService;
    }
    doStream(requestChat) {
        const { conversation_id, topic_id, message } = requestChat;
        return this.geminiRunner.streamChatResponse(conversation_id, message, topic_id);
    }
    async getChathistory(converationId) {
        const runs = await this.runsService.getConversationContext(converationId);
        const chatHistory = runs.flatMap((run) => [
            {
                sender: 'user',
                text: run.input,
            },
            {
                sender: 'model',
                text: run.output,
            },
        ]);
        return chatHistory;
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [gemini_chat_runner_service_1.GeminiChatRunnerService,
        runs_service_1.RunsService])
], ChatService);
//# sourceMappingURL=chat.service.js.map