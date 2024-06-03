import express from "express";
import { GeminiController } from "./GeminiController";
import { GeminiService } from "./GeminiService";
import { History } from './History'

const app = express();
const PORT =  process.env.PORT
const API_KEY = process.env.API_KEY || "";
const history = new History(); // Criando a instância do History
const geminiController = new GeminiController(API_KEY, history);

app.use(express.json());

app.post("/generate-response", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await geminiController.generateResponse(req, res);
    res.send({ response });
  } catch (error) {
    console.error('Erro ao processar solicitação:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});


app.get("/history", async (req, res) => {
  try {
    const history = await geminiController.getHistory(req, res);
    res.send(history);
  } catch (error) {
    console.error('Erro ao obter histórico:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
