export class History {
  private static history: { prompt: string; response: string }[] = [];

  static addToHistory(entry: { prompt: string; response: string }): void {
    this.history.push(entry);
  }

  static getHistory(): { prompt: string; response: string }[] {
    // Evitar referências circulares convertendo 'response' para string
    return this.history.map(entry => ({ prompt: entry.prompt, response: JSON.stringify(entry.response) }));
  }
}
