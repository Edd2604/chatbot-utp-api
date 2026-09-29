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
exports.RunsInConversationController = void 0;
const openapi = require("@nestjs/swagger");
const validate_uuid_pipe_1 = require("../../../common/pipes/validate-uuid.pipe");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const runs_service_1 = require("../runs.service");
let RunsInConversationController = class RunsInConversationController {
    constructor(runsService) {
        this.runsService = runsService;
    }
    getAllRunsByConversation(conversationId) {
        return this.runsService.getAllByConversation(conversationId);
    }
};
exports.RunsInConversationController = RunsInConversationController;
__decorate([
    (0, common_1.Get)(':conversationId/runs/get-runs-by-conversation'),
    (0, swagger_1.ApiOperation)({ summary: 'Obiene todas las ejecuciones de una conversacion' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('conversationId', validate_uuid_pipe_1.ValidateUUID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RunsInConversationController.prototype, "getAllRunsByConversation", null);
exports.RunsInConversationController = RunsInConversationController = __decorate([
    (0, common_1.Controller)('Conversations'),
    __metadata("design:paramtypes", [runs_service_1.RunsService])
], RunsInConversationController);
//# sourceMappingURL=runs-in-conversation.controller.js.map