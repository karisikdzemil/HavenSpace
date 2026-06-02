import { GoogleGenAi } from '@google/genai';

export const ai = new GoogleGenAi({
    apiKey: process.env.GEMINI_API_KEY
});