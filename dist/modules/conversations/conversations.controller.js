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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const validate_uuid_pipe_1 = require("../../common/pipes/validate-uuid.pipe");
const swagger_1 = require("@nestjs/swagger");
const conversations_service_1 = require("./conversations.service");
const conversations_query_params_1 = require("./query-params/conversations-query-params");
let ConversationsController = class ConversationsController {
    constructor(conversationsService) {
        this.conversationsService = conversationsService;
    }
    async getAllConversations(query) {
        return await this.conversationsService.getAll(query);
    }
    async getConversation(id) {
        return await this.conversationsService.getOneWithRuns(id);
    }
    async closeConversation(id) {
        return await this.conversationsService.close(id);
    }
};
exports.ConversationsController = ConversationsController;
__decorate([
    (0, common_1.Get)('get-all-conversations'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtiene todas las conversaciones generadas en el sistema',
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [conversations_query_params_1.ConversationsQueryParams]),
    __metadata("design:returntype", Promise)
], ConversationsController.prototype, "getAllConversations", null);
__decorate([
    (0, common_1.Get)(':conversationId/get-conversation'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtiene una conversación junto a sus ejecuciones generadas',
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('conversationId', validate_uuid_pipe_1.ValidateUUID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConversationsController.prototype, "getConversation", null);
__decorate([
    (0, common_1.Patch)(':conversationId/close-conversation'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtiene una conversación junto a sus ejecuciones generadas',
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('conversationId', validate_uuid_pipe_1.ValidateUUID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConversationsController.prototype, "closeConversation", null);
exports.ConversationsController = ConversationsController = __decorate([
    (0, swagger_1.ApiTags)('Conversations'),
    (0, common_1.Controller)('conversations'),
    __metadata("design:paramtypes", [conversations_service_1.ConversationsService])
], ConversationsController);
//# sourceMappingURL=conversations.controller.js.map