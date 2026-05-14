import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_PROMPT, buildUserPrompt } from "./prompts";
import { reportSchema } from "./reportSchema";

export async function callGeminiVision(imageBase64: string, mimeType: string, metadata: any) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in environment variables");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const modelName = process.env.GEMINI_MODEL || "gemini-1.5-pro";

  const model = genAI.getGenerativeModel({
    model: modelName,
    systemInstruction: SYSTEM_PROMPT,
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 8000,
      responseMimeType: "application/json",
      responseSchema: reportSchema as any
    }
  });

  const prompt = buildUserPrompt(metadata);
  const imagePart = {
    inlineData: {
      data: imageBase64,
      mimeType
    }
  };

  const startTime = Date.now();
  const result = await model.generateContent([prompt, imagePart]);
  const latencyMs = Date.now() - startTime;
  
  const responseText = result.response.text();
  const usageMetadata = result.response.usageMetadata;
  
  try {
    const jsonStr = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
    const json = JSON.parse(jsonStr);
    
    return {
      report: json,
      rawText: responseText,
      latencyMs,
      inputTokens: usageMetadata?.promptTokenCount || 0,
      outputTokens: usageMetadata?.candidatesTokenCount || 0,
      modelUsed: modelName
    };
  } catch (error) {
    throw new Error("Failed to parse Gemini output as JSON.");
  }
}
