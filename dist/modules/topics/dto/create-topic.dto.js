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
exports.CreateTopicDto = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateTopicDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, minLength: 5, maxLength: 100 }, description: { required: false, type: () => String }, is_active: { required: false, type: () => Boolean }, is_archived: { required: false, type: () => Boolean } };
    }
}
exports.CreateTopicDto = CreateTopicDto;
__decorate([
    (0, class_validator_1.IsString)({
        message: 'El campo "name" debe ser una cadena de texto.',
    }),
    (0, class_validator_1.Length)(5, 100, {
        message: 'El nombre debe tener entre 5 a 100 carácteres.',
    }),
    __metadata("design:type", String)
], CreateTopicDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({
        message: 'La descripción debe ser una cadena de texto.',
    }),
    __metadata("design:type", String)
], CreateTopicDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)({
        message: 'El campo "is_active" debe ser un valor booleano (true o false).',
    }),
    __metadata("design:type", Boolean)
], CreateTopicDto.prototype, "is_active", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)({
        message: 'El campo "is_archived" debe ser un valor booleano (true o false).',
    }),
    __metadata("design:type", Boolean)
], CreateTopicDto.prototype, "is_archived", void 0);
//# sourceMappingURL=create-topic.dto.js.map