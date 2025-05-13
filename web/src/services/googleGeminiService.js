import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const aiPrompt = process.env.AI_PROMPT;

export async function generateGeminiContent() {
    try {
        const result = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: aiPrompt
        });
        console.log(result.text);
        return result.text;
    }
    catch (error) {
        console.error('Gemini API error: ', error);
    }
}