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
exports.OnDocumentRemoveHandler = void 0;
const documents_service_1 = require("../../documents/documents.service");
const topics_service_1 = require("../../topics/topics.service");
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const document_events_interface_1 = require("./document-events.interface");
let OnDocumentRemoveHandler = class OnDocumentRemoveHandler {
    constructor(events, documentService, topicService) {
        this.events = events;
        this.documentService = documentService;
        this.topicService = topicService;
    }
    async handleCreated(payload) {
        const size = payload.size.toNumber();
        await this.topicService.updateSizeAndCount(payload.topic_id, size * -1);
    }
};
exports.OnDocumentRemoveHandler = OnDocumentRemoveHandler;
__decorate([
    (0, event_emitter_1.OnEvent)(document_events_interface_1.DOCUMENT_EVENTS.ON_DOCUMENT_REMOVED),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OnDocumentRemoveHandler.prototype, "handleCreated", null);
exports.OnDocumentRemoveHandler = OnDocumentRemoveHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2,
        documents_service_1.DocumentsService,
        topics_service_1.TopicsService])
], OnDocumentRemoveHandler);
//# sourceMappingURL=on-document-remove.js.map