"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const GeminiController_1 = require("./GeminiController");
const History_1 = require("./History");
const app = (0, express_1.default)();
const PORT = 3001;
const API_KEY = process.env.API_KEY || "AIzaSyDxggXqfbL8csX-iIhgKo0AMuczttRZT3c";
const geminiController = new GeminiController_1.GeminiController(API_KEY);
app.use(express_1.default.json());
app.post("/generate-response", async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await geminiController.generateResponse(req, res);
        // Modificação para evitar referências circulares
        const historyEntry = { prompt, response: JSON.stringify(response) };
        History_1.History.addToHistory(historyEntry);
        res.send({ response });
    }
    catch (error) {
        console.error('Erro ao processar solicitação:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});
app.get("/history", (req, res) => {
    geminiController.getHistory(req, res);
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
