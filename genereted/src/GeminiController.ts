// Inside GeminiController.ts

import { Request, Response } from "express";
import { GeminiService } from "./GeminiService";
import { History } from './History';

export class GeminiController {
  private geminiService: GeminiService;
  private history: History; 

  constructor(apiKey: string, history: History) {
    this.geminiService = new GeminiService(apiKey);
    this.history = history;
  }

  async generateResponse(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: 'Prompt não fornecido' });
    }

    const response = await this.geminiService.generateResponse(prompt);
    const historyEntry = { prompt, response };
    History.addToHistory(historyEntry); // Acessando o método estático

    return res.send({ response });
  }

  async getHistory(req: Request, res: Response): Promise<void> {
    try {
      const history = History.getHistory(); // Acessando o método estático
      res.send({ history });
    } catch (error) {
      console.error('Erro ao obter histórico:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}
