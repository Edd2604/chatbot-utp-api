"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateConversationDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_conversation_dto_1 = require("./create-conversation.dto");
class UpdateConversationDto extends (0, swagger_1.PartialType)(create_conversation_dto_1.CreateConversationDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateConversationDto = UpdateConversationDto;
//# sourceMappingURL=update-conversation.dto.js.map