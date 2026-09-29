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
exports.StackAIService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const FormData = require("form-data");
const stack_ai_base_url_1 = require("./constants/stack-ai-base-url");
const flow_id_reference_1 = require("./constants/flow-id-reference");
const organization_id_reference_1 = require("./constants/organization-id-reference");
const api_keys_1 = require("./constants/api-keys");
let StackAIService = class StackAIService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    streamQuery(data) {
        const url = `${stack_ai_base_url_1.STACK_AI_BASE_URL}/inference/v0/stream/${organization_id_reference_1.ORGANIZATION_ID_REFERENCE}/${flow_id_reference_1.FLOW_ID_REFERENCE}`;
        return new rxjs_1.Observable((observer) => {
            this.httpService
                .post(url, data, {
                headers: {
                    Authorization: `Bearer ${api_keys_1.STACK_PUBLIC_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                responseType: 'stream',
            })
                .subscribe({
                next: async (response) => {
                    const stream = response.data;
                    stream.setEncoding('utf8');
                    let buffer = '';
                    stream.on('data', (chunk) => {
                        buffer += chunk;
                        const lines = buffer.split('\n');
                        buffer = lines.pop() || '';
                        for (const line of lines) {
                            try {
                                if (line.trim() === '')
                                    continue;
                                const parsed = JSON.parse(line);
                                const output = parsed.outputs?.['out-0'];
                                if (output) {
                                    observer.next(output);
                                }
                            }
                            catch (err) {
                                console.warn('Línea no parseable:', err);
                            }
                        }
                    });
                    stream.on('end', () => {
                        observer.complete();
                    });
                    stream.on('error', (err) => {
                        observer.error(err);
                    });
                },
                error: (err) => {
                    observer.error(err);
                },
            });
        });
    }
    async query(data) {
        const url = `${stack_ai_base_url_1.STACK_AI_BASE_URL}/inference/v0/run/${organization_id_reference_1.ORGANIZATION_ID_REFERENCE}/${flow_id_reference_1.FLOW_ID_REFERENCE}`;
        try {
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService.post(url, data, {
                headers: {
                    Authorization: `Bearer ${api_keys_1.STACK_PUBLIC_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }));
            return response.data;
        }
        catch (error) {
            console.log(error);
            console.error('Error en la StackAI API:', error.message);
            throw new common_1.ServiceUnavailableException('Error en la StackAI API');
        }
    }
    async getDocuments() {
        const url = `${stack_ai_base_url_1.STACK_AI_BASE_URL}/documents/${organization_id_reference_1.ORGANIZATION_ID_REFERENCE}/${flow_id_reference_1.FLOW_ID_REFERENCE}/eddie.ehc04@gmail.com/doc-0`;
        try {
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService.get(url, {
                headers: {
                    Authorization: `Bearer ${api_keys_1.STACK_PRIVATE_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }));
            console.log(response);
            return response.data;
        }
        catch (error) {
            console.log(error);
            console.error('Error en la STACK AI API:', error.message);
            throw new common_1.ServiceUnavailableException('Error en la STACK AI API');
        }
    }
    async uploadDocuments(files) {
        const url = `${stack_ai_base_url_1.STACK_AI_BASE_URL}/documents/${organization_id_reference_1.ORGANIZATION_ID_REFERENCE}/${flow_id_reference_1.FLOW_ID_REFERENCE}/eddie.ehc04@gmail.com/doc-0`;
        try {
            const form = new FormData();
            for (const file of files) {
                form.append('files', file.buffer, file.originalname);
            }
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(url, form, {
                headers: {
                    Authorization: `Bearer ${api_keys_1.STACK_PRIVATE_API_KEY}`,
                    ...form.getHeaders(),
                },
            }));
            return response.data;
        }
        catch (error) {
            console.log(error);
            console.error('Error en la STACK AI API:', error?.response?.data || error.message);
            throw new common_1.ServiceUnavailableException('Error en la STACK AI API');
        }
    }
    async uploadDocument(file) {
        if (!file || !file.buffer) {
            throw new common_1.BadRequestException('No se recibió ningún archivo válido');
        }
        const url = `${stack_ai_base_url_1.STACK_AI_BASE_URL}/documents/${organization_id_reference_1.ORGANIZATION_ID_REFERENCE}/${flow_id_reference_1.FLOW_ID_REFERENCE}/eddie.ehc04@gmail.com/doc-0`;
        try {
            const form = new FormData();
            form.append('file', file.buffer, file.originalname);
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(url, form, {
                headers: {
                    Authorization: `Bearer ${api_keys_1.STACK_PRIVATE_API_KEY}`,
                    ...form.getHeaders(),
                },
            }));
            return response.data;
        }
        catch (error) {
            console.log(error);
            console.error('Error en la STACK AI API:', error?.response?.data || error.message);
            throw new common_1.ServiceUnavailableException('Error en la STACK AI API');
        }
    }
    async getWebsites() {
        const url = `${stack_ai_base_url_1.STACK_AI_BASE_URL}/indexing/v0/${flow_id_reference_1.FLOW_ID_REFERENCE}/${organization_id_reference_1.ORGANIZATION_ID_REFERENCE}/urlemb-0`;
        try {
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService.get(url, {
                headers: {
                    Authorization: `Bearer ${api_keys_1.STACK_PRIVATE_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }));
            return response.data;
        }
        catch (error) {
            console.log(error);
            console.error('Error en la STACK AI API:', error.message);
            throw new common_1.ServiceUnavailableException('Error en la STACK AI API');
        }
    }
    async uploadWebsites(data) {
        const url = `${stack_ai_base_url_1.STACK_AI_BASE_URL}/indexing/v0/urls/${flow_id_reference_1.FLOW_ID_REFERENCE}/${organization_id_reference_1.ORGANIZATION_ID_REFERENCE}/urlemb-0`;
        try {
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService.post(url, data.urls, {
                headers: {
                    Authorization: `Bearer ${api_keys_1.STACK_PRIVATE_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }));
            return response.data;
        }
        catch (error) {
            console.error('Error en la STACK AI API:', error?.response?.data || error.message);
            throw new common_1.ServiceUnavailableException('Error en la STACK AI API');
        }
    }
    async getAnalytics(query) {
        const url = `${stack_ai_base_url_1.STACK_AI_BASE_URL}/analytics/org/${organization_id_reference_1.ORGANIZATION_ID_REFERENCE}/flows/${flow_id_reference_1.FLOW_ID_REFERENCE}`;
        try {
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService.get(url, {
                headers: {
                    Authorization: `Bearer ${api_keys_1.STACK_PRIVATE_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                params: query,
            }));
            return response.data;
        }
        catch (error) {
            console.log(error);
            console.error('Error en la STACK AI API:', error?.response?.data || error.message);
            throw new common_1.ServiceUnavailableException('Error en la STACK AI API');
        }
    }
};
exports.StackAIService = StackAIService;
exports.StackAIService = StackAIService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], StackAIService);
//# sourceMappingURL=stack-ai.service.js.map