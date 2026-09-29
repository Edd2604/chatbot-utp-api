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
exports.DocumentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../providers/prisma/prisma.service");
const prisma_exception_1 = require("../../providers/prisma/exceptions/prisma.exception");
const cloudinary_service_1 = require("../../providers/cloudinary/cloudinary.service");
const uuid_1 = require("../../common/utils/uuid");
const client_1 = require("@prisma/client");
const event_emitter_1 = require("@nestjs/event-emitter");
const document_events_interface_1 = require("../events/document-events/document-events.interface");
const format_date_1 = require("../../common/utils/format-date");
let DocumentsService = class DocumentsService {
    constructor(eventEmitter, db, cloudinary) {
        this.eventEmitter = eventEmitter;
        this.db = db;
        this.cloudinary = cloudinary;
    }
    async create(createDocumentDto, file) {
        const url = await this.cloudinary.uploadFileToCloudinary(file);
        try {
            const newDocument = await this.db.document.create({
                data: {
                    id: (0, uuid_1.generateUUIDV7)(),
                    ...createDocumentDto,
                    size: file.size,
                    url,
                },
            });
            if (newDocument) {
                this.eventEmitter.emit(document_events_interface_1.DOCUMENT_EVENTS.ON_DOCUMENT_CREATED, newDocument);
                return newDocument;
            }
        }
        catch (e) {
            if (e.code) {
                throw new prisma_exception_1.PrismaException(e);
            }
            throw new common_1.InternalServerErrorException('Hubo un error al crear el documento');
        }
    }
    async getAll({ page, page_size, status, query }) {
        const pages = page || 1;
        const skip = (pages - 1) * page_size;
        const where = {
            AND: [
                query
                    ? { name: { contains: query, mode: client_1.Prisma.QueryMode.insensitive } }
                    : {},
                status !== null && status !== undefined ? { is_active: status } : {},
            ],
            is_archived: false,
        };
        const [docs, total] = await Promise.all([
            this.db.document.findMany({
                where,
                take: page_size,
                skip,
            }),
            this.db.document.count({ where }),
        ]);
        const totalPages = Math.ceil(total / page_size);
        const data = docs.map((d, i) => {
            return {
                ...d,
                number: i + 1,
                created_at: (0, format_date_1.formatDate)(d.created_at),
                updated_at: (0, format_date_1.formatDate)(d.updated_at),
            };
        });
        return {
            data,
            total,
            totalPages,
        };
    }
    async getAvailablesByTopic(topicId) {
        return await this.db.document.findMany({
            where: {
                topic_id: topicId,
                is_archived: false,
                is_active: true,
            },
            select: {
                name: true,
                url: true,
            },
        });
    }
    async getOne(id) {
        return await this.db.document.findFirst({
            where: {
                id,
                is_archived: false,
            },
        });
    }
    async update(id, updateDocumentDto) {
        try {
            const actualDocument = await this.getOne(id);
            const updatedDocument = await this.db.document.update({
                where: {
                    id,
                    is_archived: false,
                },
                data: {
                    ...updateDocumentDto,
                },
                omit: { is_archived: true },
            });
            if (updatedDocument) {
                return { actualDocument, updatedDocument };
            }
        }
        catch (e) {
            if (e.code) {
                throw new prisma_exception_1.PrismaException(e);
            }
            throw new common_1.InternalServerErrorException('Hubo un error al actualizar el documento');
        }
    }
    async remove(id) {
        try {
            const archivedDocument = await this.db.document.update({
                where: {
                    id,
                    is_archived: false,
                },
                data: {
                    is_active: false,
                    is_archived: true,
                },
            });
            if (archivedDocument) {
                this.eventEmitter.emit(document_events_interface_1.DOCUMENT_EVENTS.ON_DOCUMENT_REMOVED, archivedDocument);
                return archivedDocument;
            }
        }
        catch (e) {
            if (e.code) {
                throw new prisma_exception_1.PrismaException(e);
            }
            throw new common_1.InternalServerErrorException('Hubo un error al archivar el documento');
        }
    }
};
exports.DocumentsService = DocumentsService;
exports.DocumentsService = DocumentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2,
        prisma_service_1.PrismaService,
        cloudinary_service_1.CloudinaryService])
], DocumentsService);
//# sourceMappingURL=documents.service.js.map