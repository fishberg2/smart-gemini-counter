import { GoogleGenAI, Type } from "@google/genai";
import { AIFactResponse } from "../types";

// Initialize the Gemini API client
// Note: process.env.API_KEY is assumed to be available in the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a fun fact or insight about a specific number.
 */
export const generateNumberFact = async (number: number): Promise<AIFactResponse> => {
  try {
    const model = "gemini-2.5-flash";
    // Prompt tweaked to be less likely to trigger safety filters (avoiding "joke" which can sometimes be flagged)
    const prompt = `Tell me a brief, interesting, or scientific fact about the number ${number}. If the number is common, provide a unique mathematical property or a historical event associated with it.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: "You are a knowledgeable mathematician. Return the response in JSON format.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fact: { type: Type.STRING, description: "The interesting fact about the number." },
            category: { type: Type.STRING, description: "The category (e.g., 'Math', 'History', 'Science', 'Trivia')." }
          },
          required: ["fact", "category"],
        },
        temperature: 0.7,
        // Removed maxOutputTokens to prevent potential JSON truncation
      },
    });

    const text = response.text;
    
    if (!text) {
      // If text is empty (e.g., blocked by safety settings), return a fallback instead of throwing
      console.warn("Gemini response text was empty.", response);
      return {
        fact: `The number ${number} is quite mysterious! I couldn't retrieve a specific fact right now.`,
        category: "Mystery"
      };
    }

    return JSON.parse(text) as AIFactResponse;
  } catch (error) {
    console.error("Error generating number fact:", error);
    return {
      fact: `We couldn't find a fact for ${number} right now, but it's still a great number!`,
      category: "System"
    };
  }
};