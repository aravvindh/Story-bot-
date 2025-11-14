
import { GoogleGenAI, Type } from "@google/genai";
import type { StoryResponse } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const storySchema = {
  type: Type.OBJECT,
  properties: {
    story: {
      type: Type.STRING,
      description: "A simple, engaging, and short story that answers the child's question. Should be imaginative and easy for a 7-year-old to understand. No more than 150 words.",
    },
    example: {
      type: Type.STRING,
      description: "A real-world, tangible example related to the story and question. It should be very simple and relatable for a child. No more than 50 words.",
    },
  },
  required: ["story", "example"],
};

export const generateStory = async (question: string): Promise<StoryResponse> => {
  const prompt = `You are a friendly, imaginative storyteller for a 7-year-old child. A child has asked a question: "${question}". Answer their question by telling a simple, engaging, and short story. The story should include a real-world example that the child can understand. Keep it positive and fun.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: storySchema,
        temperature: 0.8,
        topP: 0.9,
      },
    });

    const jsonText = response.text.trim();
    const storyData: StoryResponse = JSON.parse(jsonText);
    
    if (!storyData.story || !storyData.example) {
        throw new Error("Received incomplete story data from API.");
    }
    
    return storyData;

  } catch (error) {
    console.error("Error generating story from Gemini API:", error);
    throw new Error("Failed to get a story. Please try again.");
  }
};
