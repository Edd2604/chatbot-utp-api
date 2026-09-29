"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateUUID = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let ValidateUUID = class ValidateUUID {
    transform(value) {
        if (!isValidUUIDv7(value)) {
            throw new common_1.BadRequestException('UUID inválido. Se espera un UUID versión 7.');
        }
        return value;
    }
};
exports.ValidateUUID = ValidateUUID;
exports.ValidateUUID = ValidateUUID = __decorate([
    (0, common_1.Injectable)()
], ValidateUUID);
function isValidUUIDv7(uuid) {
    if (!(0, uuid_1.validate)(uuid))
        return false;
    return (0, uuid_1.version)(uuid) === 7;
}
//# sourceMappingURL=validate-uuid.pipe.js.map