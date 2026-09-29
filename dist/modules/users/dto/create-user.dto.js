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
exports.CreateUserDto = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
class CreateUserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { dni: { required: true, type: () => String, minLength: 8, maxLength: 8 }, email: { required: true, type: () => String, format: "email" }, password: { required: true, type: () => String, minLength: 8, maxLength: 20 }, is_active: { required: false, type: () => Boolean }, role: { required: true, type: () => Object }, modules_access: { required: true, type: () => [String] } };
    }
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'El DNI debe ser una cadena de texto' }),
    (0, class_validator_1.Length)(8, 8, { message: 'El DNI debe tener exactamente 8 caracteres.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "dni", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'El correo electrónico debe ser uno válido' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'La contraseña debe ser una cadena de texto' }),
    (0, class_validator_1.Length)(8, 20, {
        message: 'La contraseña debe tener entre 8 y 20 caracteres.',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)({ message: 'El estado "is_active" debe ser un valor booleano.' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "is_active", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.Role }),
    (0, class_validator_1.IsEnum)(client_1.Role, { message: 'El rol debe ser uno válido' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)({ message: 'Los permisos deben ser un array de strings' }),
    (0, class_validator_1.IsString)({ each: true, message: 'Cada permiso debe ser un string' }),
    __metadata("design:type", Array)
], CreateUserDto.prototype, "modules_access", void 0);
//# sourceMappingURL=create-user.dto.js.map