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
exports.MonitoringService = void 0;
const common_1 = require("@nestjs/common");
const gemini_ai_service_1 = require("../../providers/gemini-ai/gemini-ai.service");
const gemini_ai_models_enum_1 = require("../../providers/gemini-ai/interfaces/gemini-ai-models.enum");
const prisma_service_1 = require("../../providers/prisma/prisma.service");
const date_fns_1 = require("date-fns");
const locale_1 = require("date-fns/locale");
const generative_ai_1 = require("@google/generative-ai");
const top_inputs_context_1 = require("./prompts/top-inputs.context");
let MonitoringService = class MonitoringService {
    constructor(db, ai) {
        this.db = db;
        this.ai = ai;
    }
    async getRunsAnalytics() {
        const start = new Date(new Date().getFullYear(), 0, 1);
        const end = new Date();
        const runs = await this.db.run.findMany({
            where: {
                created_at: {
                    gte: start,
                    lte: end,
                },
            },
            select: {
                created_at: true,
                is_run_successful: true,
            },
        });
        const summary = new Map();
        for (const run of runs) {
            const date = run.created_at.toISOString().split('T')[0];
            if (!summary.has(date)) {
                summary.set(date, { ok: 0, error: 0 });
            }
            const entry = summary.get(date);
            if (run.is_run_successful) {
                entry.ok++;
            }
            else {
                entry.error++;
            }
        }
        const result = [];
        const current = new Date(start);
        while (current <= end) {
            const date = current.toISOString().split('T')[0];
            const counts = summary.get(date) ?? { ok: 0, error: 0 };
            result.push({ date, ...counts });
            current.setDate(current.getDate() + 1);
        }
        return result;
    }
    async getTokensPerMonth() {
        const now = new Date();
        const sixMonthsAgo = (0, date_fns_1.subMonths)(now, 5);
        const runs = await this.db.run.findMany({
            where: {
                created_at: {
                    gte: (0, date_fns_1.startOfMonth)(sixMonthsAgo),
                },
            },
            select: {
                created_at: true,
                tokens: true,
            },
        });
        const months = {};
        for (let i = 5; i >= 0; i--) {
            const date = (0, date_fns_1.subMonths)(now, i);
            const monthKey = (0, date_fns_1.format)(date, 'MMMM', { locale: locale_1.es });
            months[monthKey.charAt(0).toUpperCase() + monthKey.slice(1)] = 0;
        }
        runs.forEach((run) => {
            const monthKey = (0, date_fns_1.format)(run.created_at, 'MMMM', { locale: locale_1.es });
            const monthSummary = monthKey.charAt(0).toUpperCase() + monthKey.slice(1);
            if (months[monthSummary] !== undefined) {
                months[monthSummary] += run.tokens ?? 0;
            }
        });
        return Object.entries(months).map(([month, totalTokens]) => ({
            month,
            totalTokens,
        }));
    }
    async getTopInputs() {
        const runs = await this.db.run.findMany({
            select: { created_at: true, input: true, conversation_id: true },
            orderBy: { created_at: 'desc' },
            take: 2000,
        });
        const validInputs = runs.filter((run) => run.input && run.input.trim().length > 0);
        const aiResponse = await this.ai.getStructuredResponse(gemini_ai_models_enum_1.GeminiModels.GEMINI_1_5_FLASH_8B, top_inputs_context_1.TOP_INPUTS_CONTEXT, [JSON.stringify(validInputs)], {
            type: generative_ai_1.SchemaType.ARRAY,
            items: {
                type: generative_ai_1.SchemaType.OBJECT,
                properties: {
                    number: { type: generative_ai_1.SchemaType.INTEGER },
                    question: { type: generative_ai_1.SchemaType.STRING },
                },
                required: ['number', 'question'],
            },
        });
        try {
            return JSON.parse(aiResponse);
        }
        catch (e) {
            console.warn(e);
            throw new common_1.InternalServerErrorException('Error en la generacion de la ia');
        }
    }
};
exports.MonitoringService = MonitoringService;
exports.MonitoringService = MonitoringService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        gemini_ai_service_1.GeminiAIService])
], MonitoringService);
//# sourceMappingURL=monitoring.service.js.map