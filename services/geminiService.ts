
import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";

export class GeminiService {
  private ai: GoogleGenAI;
  private chat: Chat | null = null;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  public async startNewChat(subjectName: string): Promise<string> {
    this.chat = this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `${SYSTEM_PROMPT}\n\nThe current subject is: ${subjectName}. Start by introducing yourself and asking an opening competency-based question about ${subjectName}.`,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    const response = await this.chat.sendMessage({ message: `Hi, I am ready to start my assessment for ${subjectName}.` });
    return response.text || "Hello! Let's begin our assessment.";
  }

  public async sendMessage(message: string): Promise<string> {
    if (!this.chat) {
      throw new Error("Chat not initialized. Select a subject first.");
    }

    const response = await this.chat.sendMessage({ message });
    return response.text || "I'm sorry, I couldn't process that. Could you repeat?";
  }
}

export const geminiService = new GeminiService();
