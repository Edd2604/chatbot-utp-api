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
exports.RunsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../providers/prisma/prisma.service");
const prisma_exception_1 = require("../../providers/prisma/exceptions/prisma.exception");
const uuid_1 = require("../../common/utils/uuid");
const format_date_1 = require("../../common/utils/format-date");
const client_1 = require("@prisma/client");
let RunsService = class RunsService {
    constructor(db) {
        this.db = db;
    }
    async create(createRunDto) {
        try {
            const run = await this.db.run.create({
                data: {
                    id: (0, uuid_1.generateUUIDV7)(),
                    ...createRunDto,
                },
            });
            return run;
        }
        catch (e) {
            if (e.code) {
                throw new prisma_exception_1.PrismaException(e);
            }
            throw new common_1.InternalServerErrorException('Ocurrio un error inesperado al registrar la ejecución');
        }
    }
    async getAll({ start_date, end_date, page, page_size, error, query, }) {
        const pages = page || 1;
        const skip = (pages - 1) * page_size;
        const where = {
            AND: [
                query
                    ? {
                        conversation_id: {
                            contains: query,
                            mode: client_1.Prisma.QueryMode.insensitive,
                        },
                    }
                    : {},
                error !== undefined && error !== null
                    ? { is_run_successful: !error }
                    : {},
                start_date || end_date
                    ? {
                        created_at: {
                            ...(start_date ? { gte: start_date } : {}),
                            ...(end_date ? { lte: end_date } : {}),
                        },
                    }
                    : {},
            ],
        };
        const [runs, total] = await Promise.all([
            this.db.run.findMany({
                where,
                skip,
                take: page_size,
            }),
            this.db.run.count({ where }),
        ]);
        const totalPages = Math.ceil(total / page_size);
        const data = runs.map((r, i) => ({
            ...r,
            number: i + 1 + skip,
            created_at: (0, format_date_1.formatDate)(r.created_at),
        }));
        return {
            data,
            total,
            totalPages,
        };
    }
    async getAllByConversation(conversationId) {
        return await this.db.run.findMany({
            where: {
                conversation_id: conversationId,
            },
        });
    }
    async getConversationContext(conversationId) {
        return await this.db.run.findMany({
            where: {
                conversation_id: conversationId,
            },
            select: { input: true, output: true },
        });
    }
    async getOne(runId) {
        return await this.db.run.findFirst({
            where: {
                id: runId,
            },
        });
    }
};
exports.RunsService = RunsService;
exports.RunsService = RunsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RunsService);
//# sourceMappingURL=runs.service.js.map