"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsModule = void 0;
const common_1 = require("@nestjs/common");
const conversations_module_1 = require("../conversations/conversations.module");
const runs_module_1 = require("../runs/runs.module");
const logger_module_1 = require("../logger/logger.module");
const topics_module_1 = require("../topics/topics.module");
const documents_module_1 = require("../documents/documents.module");
const on_run_execute_1 = require("./run-events/on-run-execute");
const on_entity_archive_1 = require("./logger/on-entity-archive");
const on_entity_create_1 = require("./logger/on-entity-create");
const on_entity_update_1 = require("./logger/on-entity-update");
const on_document_create_1 = require("./document-events/on-document-create");
const on_document_remove_1 = require("./document-events/on-document-remove");
let EventsModule = class EventsModule {
};
exports.EventsModule = EventsModule;
exports.EventsModule = EventsModule = __decorate([
    (0, common_1.Module)({
        providers: [
            on_run_execute_1.OnRunExecuteHandler,
            on_document_create_1.OnDocumentCreateHandler,
            on_document_remove_1.OnDocumentRemoveHandler,
            on_entity_archive_1.OnEntityArchiveHandler,
            on_entity_create_1.OnEntityCreateHandler,
            on_entity_update_1.OnEntityUpdateHandler,
        ],
        imports: [
            conversations_module_1.ConversationsModule,
            runs_module_1.RunsModule,
            logger_module_1.LoggerModule,
            documents_module_1.DocumentsModule,
            topics_module_1.TopicsModule,
        ],
    })
], EventsModule);
//# sourceMappingURL=events.module.js.map