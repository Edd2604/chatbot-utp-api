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
exports.CreateConversationDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateConversationDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String, format: "uuid" }, title: { required: false, type: () => String, minLength: 2, maxLength: 100 } };
    }
}
exports.CreateConversationDto = CreateConversationDto;
__decorate([
    (0, class_validator_1.IsUUID)(7, {
        message: 'El id de la conversacion debe ser un uuid version 7 ',
    }),
    __metadata("design:type", String)
], CreateConversationDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(2, 100, { message: 'El titulo no debe superar los 100 carácteres' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateConversationDto.prototype, "title", void 0);
//# sourceMappingURL=create-conversation.dto.js.map