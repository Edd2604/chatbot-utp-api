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
exports.ConversationsQueryParams = void 0;
const rangeDate_query_params_1 = require("../../../common/query-params/rangeDate-query-params");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
class ConversationsQueryParams extends rangeDate_query_params_1.RangeDateQueryParams {
}
exports.ConversationsQueryParams = ConversationsQueryParams;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: client_1.ConversationStatus,
        default: '',
        description: 'Estado de la conversación',
    }),
    (0, class_validator_1.IsEnum)(client_1.ConversationStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ConversationsQueryParams.prototype, "conversationStatus", void 0);
//# sourceMappingURL=conversations-query-params.js.map