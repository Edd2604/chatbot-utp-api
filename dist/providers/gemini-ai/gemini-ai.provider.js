"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiProvider = void 0;
const generative_ai_1 = require("@google/generative-ai");
const envs_1 = require("../../config/envs");
exports.GeminiProvider = {
    provide: generative_ai_1.GoogleGenerativeAI,
    useFactory: () => {
        const apiKey = envs_1.envs.geminiApiKey;
        return new generative_ai_1.GoogleGenerativeAI(apiKey);
    },
};
//# sourceMappingURL=gemini-ai.provider.js.map