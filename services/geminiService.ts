import { GoogleGenAI, Type } from "@google/genai";
import type { ApiResponse } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    responseType: {
      type: Type.STRING,
      description: "Analyze the user's input. If it is a question that needs a story, set to 'story'. If it is a greeting or simple conversational phrase, set to 'greeting'.",
      enum: ['story', 'greeting'],
    },
    storyDetails: {
      type: Type.OBJECT,
      description: "Only include this field if responseType is 'story'. Contains the story and example.",
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
    },
    greetingText: {
      type: Type.STRING,
      description: "Only include this field if responseType is 'greeting'. A short, friendly, and cheerful reply to the user's greeting or statement.",
    },
  },
  required: ["responseType"],
};

export const generateResponse = async (question: string): Promise<ApiResponse> => {
  const prompt = `You are StoryBot, a friendly, imaginative AI friend for a 7-year-old child. Your job is to have simple conversations and tell stories.
A child has sent you a message: "${question}".

First, analyze the message:
- If it is a greeting (like 'hi', 'hello'), a simple statement ('you are cool'), or a thank you, respond with a short, friendly, conversational reply. Set responseType to 'greeting'.
- If it is a question that can be answered with a story (like 'why is the sky blue?'), then answer their question by telling a simple, engaging, and short story. The story must include a real-world example that the child can understand. Keep it positive and fun. Set responseType to 'story'.

Respond ONLY with the requested JSON object based on your analysis.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8,
        topP: 0.9,
      },
    });

    const jsonText = response.text.trim();
    const parsedResponse = JSON.parse(jsonText);
    
    if (parsedResponse.responseType === 'story' && parsedResponse.storyDetails) {
        return {
            type: 'story',
            data: {
                story: parsedResponse.storyDetails.story,
                example: parsedResponse.storyDetails.example
            }
        };
    } else if (parsedResponse.responseType === 'greeting' && parsedResponse.greetingText) {
        return {
            type: 'greeting',
            data: {
                greeting: parsedResponse.greetingText
            }
        };
    } else {
        throw new Error("Received invalid data structure from API.");
    }

  } catch (error) {
    console.error("Error generating response from Gemini API:", error);
    throw new Error("Failed to get a response. Please try again.");
  }
};