import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateText = async (prompt) => {
    const result = await model.generateContent(prompt);
    const response = result.response;

    return response?.candidates[0].content.parts[0].text;
};






