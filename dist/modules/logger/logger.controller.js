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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const logger_service_1 = require("./logger.service");
const logs_query_params_1 = require("./query-params/logs-query-params");
let LoggerController = class LoggerController {
    constructor(logger) {
        this.logger = logger;
    }
    async findAll(query) {
        return await this.logger.getAll(query);
    }
};
exports.LoggerController = LoggerController;
__decorate([
    (0, common_1.Get)('get-all-logs'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtiene todos los logs de entidades' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [logs_query_params_1.LogsQueryParams]),
    __metadata("design:returntype", Promise)
], LoggerController.prototype, "findAll", null);
exports.LoggerController = LoggerController = __decorate([
    (0, common_1.Controller)('Logs'),
    __metadata("design:paramtypes", [logger_service_1.LoggerService])
], LoggerController);
//# sourceMappingURL=logger.controller.js.map