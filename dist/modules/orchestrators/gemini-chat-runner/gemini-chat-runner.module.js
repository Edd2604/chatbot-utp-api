"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiChatRunnerModule = void 0;
const common_1 = require("@nestjs/common");
const runs_module_1 = require("../../runs/runs.module");
const documents_module_1 = require("../../documents/documents.module");
const conversations_module_1 = require("../../conversations/conversations.module");
const gemini_chat_runner_service_1 = require("./gemini-chat-runner.service");
let GeminiChatRunnerModule = class GeminiChatRunnerModule {
};
exports.GeminiChatRunnerModule = GeminiChatRunnerModule;
exports.GeminiChatRunnerModule = GeminiChatRunnerModule = __decorate([
    (0, common_1.Module)({
        providers: [gemini_chat_runner_service_1.GeminiChatRunnerService],
        exports: [gemini_chat_runner_service_1.GeminiChatRunnerService],
        imports: [runs_module_1.RunsModule, documents_module_1.DocumentsModule, conversations_module_1.ConversationsModule],
    })
], GeminiChatRunnerModule);
//# sourceMappingURL=gemini-chat-runner.module.js.map