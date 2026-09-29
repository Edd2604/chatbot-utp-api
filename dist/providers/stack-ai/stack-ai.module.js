"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StackAIModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const stack_ai_service_1 = require("./stack-ai.service");
const stack_ai_controller_1 = require("./stack-ai.controller");
let StackAIModule = class StackAIModule {
};
exports.StackAIModule = StackAIModule;
exports.StackAIModule = StackAIModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        providers: [stack_ai_service_1.StackAIService],
        controllers: [stack_ai_controller_1.StackAIController],
        exports: [stack_ai_service_1.StackAIService],
    })
], StackAIModule);
//# sourceMappingURL=stack-ai.module.js.map