"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const event_emitter_1 = require("@nestjs/event-emitter");
const reniec_module_1 = require("./providers/reniec/reniec.module");
const events_module_1 = require("./modules/events/events.module");
const pusher_module_1 = require("./providers/pusher/pusher.module");
const chat_module_1 = require("./modules/chat/chat.module");
const users_module_1 = require("./modules/users/users.module");
const auth_module_1 = require("./modules/auth/auth.module");
const prisma_module_1 = require("./providers/prisma/prisma.module");
const logger_module_1 = require("./modules/logger/logger.module");
const cloudinary_module_1 = require("./providers/cloudinary/cloudinary.module");
const gemini_ai_module_1 = require("./providers/gemini-ai/gemini-ai.module");
const topics_module_1 = require("./modules/topics/topics.module");
const gemini_chat_runner_module_1 = require("./modules/orchestrators/gemini-chat-runner/gemini-chat-runner.module");
const conversations_module_1 = require("./modules/conversations/conversations.module");
const documents_module_1 = require("./modules/documents/documents.module");
const runs_module_1 = require("./modules/runs/runs.module");
const monitoring_module_1 = require("./modules/monitoring/monitoring.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            chat_module_1.ChatModule,
            prisma_module_1.PrismaModule,
            logger_module_1.LoggerModule,
            cloudinary_module_1.CloudinaryModule,
            gemini_ai_module_1.GeminiAIModule,
            reniec_module_1.ReniecModule,
            auth_module_1.AuthModule,
            pusher_module_1.PusherModule,
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            users_module_1.UsersModule,
            event_emitter_1.EventEmitterModule.forRoot({
                wildcard: true,
            }),
            topics_module_1.TopicsModule,
            gemini_chat_runner_module_1.GeminiChatRunnerModule,
            conversations_module_1.ConversationsModule,
            documents_module_1.DocumentsModule,
            runs_module_1.RunsModule,
            events_module_1.EventsModule,
            monitoring_module_1.MonitoringModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map