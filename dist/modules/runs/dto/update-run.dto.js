"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRunDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_run_dto_1 = require("./create-run.dto");
class UpdateRunDto extends (0, swagger_1.PartialType)(create_run_dto_1.CreateRunDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateRunDto = UpdateRunDto;
//# sourceMappingURL=update-run.dto.js.map