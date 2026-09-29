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
exports.OnRunExecuteHandler = void 0;
const conversations_service_1 = require("../../conversations/conversations.service");
const runs_service_1 = require("../../runs/runs.service");
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const gemini_ai_service_1 = require("../../../providers/gemini-ai/gemini-ai.service");
const gemini_ai_models_enum_1 = require("../../../providers/gemini-ai/interfaces/gemini-ai-models.enum");
const run_events_interfaces_1 = require("./run-events.interfaces");
const generate_tittle_context_1 = require("./prompts/generate-tittle.context");
let OnRunExecuteHandler = class OnRunExecuteHandler {
    constructor(events, runsService, conversationsService, ai) {
        this.events = events;
        this.runsService = runsService;
        this.conversationsService = conversationsService;
        this.ai = ai;
    }
    async handleCreated(payload) {
        const conversation = await this.conversationsService.getOne(payload.conversation_id);
        let title = null;
        if (!conversation) {
            title = await this.generateTitle(payload.input);
            await this.conversationsService.create({
                id: payload.conversation_id,
                title,
            });
        }
        await this.runsService.create(payload);
        await this.conversationsService.update(payload.conversation_id, payload.tokens);
        return title;
    }
    async generateTitle(input) {
        const response = await this.ai.getResponse(gemini_ai_models_enum_1.GeminiModels.GEMINI_1_5_FLASH_8B, generate_tittle_context_1.GENERATE_TITLE_CONTEXT, [input]);
        return response;
    }
};
exports.OnRunExecuteHandler = OnRunExecuteHandler;
__decorate([
    (0, event_emitter_1.OnEvent)(run_events_interfaces_1.RUN_EVENTS.ON_RUN_EXECUTED_EVENT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OnRunExecuteHandler.prototype, "handleCreated", null);
exports.OnRunExecuteHandler = OnRunExecuteHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2,
        runs_service_1.RunsService,
        conversations_service_1.ConversationsService,
        gemini_ai_service_1.GeminiAIService])
], OnRunExecuteHandler);
//# sourceMappingURL=on-run-execute.js.map