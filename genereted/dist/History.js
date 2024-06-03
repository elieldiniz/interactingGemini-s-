"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.History = void 0;
class History {
    static addToHistory(entry) {
        this.history.push(entry);
    }
    static getHistory() {
        // Evitar referências circulares convertendo 'response' para string
        return this.history.map(entry => ({ prompt: entry.prompt, response: JSON.stringify(entry.response) }));
    }
}
exports.History = History;
History.history = [];
