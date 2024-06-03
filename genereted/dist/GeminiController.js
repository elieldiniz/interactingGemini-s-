"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiController = void 0;
const GeminiService_1 = require("./GeminiService");
const History_1 = require("./History");
class GeminiController {
    constructor(apiKey) {
        this.geminiService = new GeminiService_1.GeminiService(apiKey);
    }
    async generateResponse(req, res) {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ message: 'Prompt não fornecido' });
        }
        const response = await this.geminiService.generateResponse(prompt);
        const historyEntry = { prompt, response };
        History_1.History.addToHistory(historyEntry);
        return res.send({ response });
    }
    async getHistory(req, res) {
        try {
            const history = History_1.History.getHistory(); // Obter o histórico do armazenamento
            res.send({ history }); // Enviar os dados do histórico como JSON
        }
        catch (error) {
            console.error('Erro ao obter histórico:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
    async addToHistory(req, res) {
        try {
            const { entry } = req.body;
            History_1.History.addToHistory(entry); // Adiciona uma nova entrada ao histórico
            res.send({ message: 'Entrada adicionada ao histórico com sucesso' });
        }
        catch (error) {
            console.error('Erro ao adicionar entrada ao histórico:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
}
exports.GeminiController = GeminiController;
