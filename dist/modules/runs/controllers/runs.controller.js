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
exports.RunsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const validate_uuid_pipe_1 = require("../../../common/pipes/validate-uuid.pipe");
const swagger_1 = require("@nestjs/swagger");
const runs_service_1 = require("../runs.service");
const runs_query_params_1 = require("../query-params/runs-query-params");
let RunsController = class RunsController {
    constructor(runsService) {
        this.runsService = runsService;
    }
    getAllruns(query) {
        return this.runsService.getAll(query);
    }
    getRun(id) {
        return this.runsService.getOne(id);
    }
};
exports.RunsController = RunsController;
__decorate([
    (0, common_1.Get)('/get-all-runs'),
    (0, swagger_1.ApiOperation)({ summary: 'Obiene todas las ejecuciones' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [runs_query_params_1.RunQueryParams]),
    __metadata("design:returntype", void 0)
], RunsController.prototype, "getAllruns", null);
__decorate([
    (0, common_1.Get)(':runId/get-run'),
    (0, swagger_1.ApiOperation)({ summary: 'Obiene una sola ejecucion' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('runId', validate_uuid_pipe_1.ValidateUUID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RunsController.prototype, "getRun", null);
exports.RunsController = RunsController = __decorate([
    (0, common_1.Controller)('runs'),
    __metadata("design:paramtypes", [runs_service_1.RunsService])
], RunsController);
//# sourceMappingURL=runs.controller.js.map