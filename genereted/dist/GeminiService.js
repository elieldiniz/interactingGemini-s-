"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiService = void 0;
const generative_ai_1 = require("@google/generative-ai");
class GeminiService {
    constructor(apiKey) {
        this.genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
        const modelId = "gemini-pro";
        const generationConfig = {
            stopSequences: ["red"],
            maxOutputTokens: 200,
            temperature: 0.9,
            topP: 0.1,
            topK: 16,
        };
        const safetySettings = [
            {
                category: generative_ai_1.HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: generative_ai_1.HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
            {
                category: generative_ai_1.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
        ];
        this.model = this.genAI.getGenerativeModel({ model: modelId, generationConfig, safetySettings });
    }
    async generateResponse(prompt) {
        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            return text;
        }
        catch (error) {
            console.error('Erro ao gerar resposta do Gemini:', error);
            throw new Error('Erro ao gerar resposta do Gemini.');
        }
    }
}
exports.GeminiService = GeminiService;
