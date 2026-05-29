"use server";

import { model } from "@/lib/gemini";

export type Message = {
  role: "user" | "model";
  content: string;
};



export async function chat(history: Message[], message: string) {
  let validHistory = [...history];
  
  if (validHistory.length > 0 && validHistory[0].role === "model") {
    validHistory.shift(); // Remove the first message if it's from the model
  }

  try {
    const chatSession = model.startChat({
      history: validHistory.map((m) => ({
        role: m.role,
        parts: [{ text: m.content }],
      })),
    });

    const result = await chatSession.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return {
      role: "model" as const,
      content: text,
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      role: "model" as const,
      content: "I apologize, but I am having trouble connecting to my logical faculties at the moment. Please try again.",
    };
  }
}
