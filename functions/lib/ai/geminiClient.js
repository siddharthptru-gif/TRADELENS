"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callGeminiVision = callGeminiVision;
const generative_ai_1 = require("@google/generative-ai");
const prompts_1 = require("./prompts");
const reportSchema_1 = require("./reportSchema");
async function callGeminiVision(imageBase64, mimeType, metadata) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not set in environment variables");
    }
    const genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
    const modelName = process.env.GEMINI_MODEL || "gemini-1.5-pro";
    const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: prompts_1.SYSTEM_PROMPT,
        generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 8000,
            responseMimeType: "application/json",
            responseSchema: reportSchema_1.reportSchema
        }
    });
    const prompt = (0, prompts_1.buildUserPrompt)(metadata);
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
    }
    catch (error) {
        throw new Error("Failed to parse Gemini output as JSON.");
    }
}
//# sourceMappingURL=geminiClient.js.map