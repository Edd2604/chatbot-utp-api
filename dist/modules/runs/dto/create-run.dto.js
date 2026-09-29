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
exports.CreateRunDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateRunDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { conversation_id: { required: true, type: () => String, format: "uuid" }, is_run_successful: { required: true, type: () => Boolean }, model_llm: { required: true, type: () => String }, latency: { required: true, type: () => Number, minimum: 0 }, tokens: { required: true, type: () => Number, minimum: 0 }, input: { required: true, type: () => String }, output: { required: true, type: () => String }, error: { required: false, type: () => String } };
    }
}
exports.CreateRunDto = CreateRunDto;
__decorate([
    (0, class_validator_1.IsUUID)(7, {
        message: 'El ID de la conversación debe ser un UUID válido de versión 7.',
    }),
    __metadata("design:type", String)
], CreateRunDto.prototype, "conversation_id", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)({
        message: 'El campo "is_run_successful" debe ser un valor booleano (true o false).',
    }),
    __metadata("design:type", Boolean)
], CreateRunDto.prototype, "is_run_successful", void 0);
__decorate([
    (0, class_validator_1.IsString)({
        message: 'El campo "model_llm" debe ser una cadena de texto.',
    }),
    __metadata("design:type", String)
], CreateRunDto.prototype, "model_llm", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 6 }, {
        message: 'La latencia debe ser un número con hasta 6 decimales.',
    }),
    (0, class_validator_1.Min)(0, {
        message: 'La latencia no puede ser negativa.',
    }),
    __metadata("design:type", Number)
], CreateRunDto.prototype, "latency", void 0);
__decorate([
    (0, class_validator_1.IsInt)({
        message: 'El campo "tokens" debe ser un número entero.',
    }),
    (0, class_validator_1.Min)(0, {
        message: 'La cantidad de tokens no puede ser negativa.',
    }),
    __metadata("design:type", Number)
], CreateRunDto.prototype, "tokens", void 0);
__decorate([
    (0, class_validator_1.IsString)({
        message: 'El campo "input" debe ser una cadena de texto.',
    }),
    __metadata("design:type", String)
], CreateRunDto.prototype, "input", void 0);
__decorate([
    (0, class_validator_1.IsString)({
        message: 'El campo "output" debe ser una cadena de texto.',
    }),
    __metadata("design:type", String)
], CreateRunDto.prototype, "output", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({
        message: 'El campo "error", si se proporciona, debe ser una cadena de texto.',
    }),
    __metadata("design:type", String)
], CreateRunDto.prototype, "error", void 0);
//# sourceMappingURL=create-run.dto.js.map