"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTopicDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_topic_dto_1 = require("./create-topic.dto");
class UpdateTopicDto extends (0, swagger_1.PartialType)(create_topic_dto_1.CreateTopicDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateTopicDto = UpdateTopicDto;
//# sourceMappingURL=update-topic.dto.js.map