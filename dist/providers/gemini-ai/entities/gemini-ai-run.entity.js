"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiRunData = void 0;
const openapi = require("@nestjs/swagger");
class GeminiRunData {
    constructor() {
        this.input = '';
        this.output = '';
        this.tokens = 0;
        this.model = '';
        this.latency = 0;
        this.error = null;
        this.startTime = Date.now();
    }
    setInput(input) {
        this.input = input;
    }
    setModel(model) {
        this.model = model;
    }
    addChunk(text) {
        this.output += text;
    }
    setTokens(count) {
        this.tokens = count;
    }
    setError(message) {
        this.error = message;
    }
    finish() {
        this.latency = Number(((Date.now() - this.startTime) / 1000).toFixed(6));
        return this;
    }
    toCreateDto(conversationId) {
        return {
            conversation_id: conversationId,
            is_run_successful: this.error === null,
            model_llm: this.model,
            latency: this.latency,
            tokens: this.tokens,
            input: this.input,
            output: this.output,
            error: this.error ?? undefined,
        };
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { input: { required: true, type: () => Object, default: "" }, output: { required: true, type: () => Object, default: "" }, tokens: { required: true, type: () => Object, default: 0 }, model: { required: true, type: () => Object, default: "" }, latency: { required: true, type: () => Object, default: 0 }, error: { required: true, type: () => String, nullable: true, default: null }, startTime: { required: true, type: () => Number } };
    }
}
exports.GeminiRunData = GeminiRunData;
//# sourceMappingURL=gemini-ai-run.entity.js.map