
import { GoogleGenAI } from "@google/genai";

export const generateDesignConcept = async (prompt: string) => {
  // Use a new instance initialized with process.env.API_KEY directly for better reliability
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `You are an expert sportswear design consultant for Apex Manufacturing. Based on the user's request: "${prompt}", provide a detailed design specification including recommended fabrics, color hex codes, and style features. Return your answer in a clear, professional tone.`,
    config: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
    }
  });

  // Directly access the .text property of GenerateContentResponse as per documentation
  return response.text || '';
};

export const generateUniformPreview = async (prompt: string) => {
  // Use a new instance initialized with process.env.API_KEY directly
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { text: `A professional studio product photography of a custom sports uniform. Style: ${prompt}. High quality, 4k, clean background, athletic fit.` }
      ]
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });

  // Iterate through all parts of the response candidates to extract the image data safely
  if (response.candidates?.[0]?.content?.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  }
  return null;
};
