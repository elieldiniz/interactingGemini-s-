import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any; // O tipo do modelo depende da API

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
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
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ];
      this.model = this.genAI.getGenerativeModel({ model: modelId, generationConfig, safetySettings });
    }

  async generateResponse(prompt: string): Promise<string> {
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return text;
    } catch (error) {
      console.error('Erro ao gerar resposta do Gemini:', error);
      throw new Error('Erro ao gerar resposta do Gemini.');
    }
  }
}
