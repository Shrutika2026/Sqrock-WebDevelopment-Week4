import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

export async function askAI(
  prompt: string,
  context?: string
): Promise<string> {
  if (!genAI) {
    return getFallbackResponse(prompt);
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const fullPrompt = context
      ? `You are CodeLearn AI, an expert coding tutor for an LMS platform. Be helpful, concise, and educational.\n\nContext: ${context}\n\nUser question: ${prompt}`
      : `You are CodeLearn AI, an expert coding tutor for an LMS platform. Be helpful, concise, and educational.\n\nUser question: ${prompt}`;

    const result = await model.generateContent(fullPrompt);
    return result.response.text();
  } catch {
    return getFallbackResponse(prompt);
  }
}

export async function generateQuiz(
  topic: string,
  count: number = 5
): Promise<Array<{ question: string; options: string[]; correctAnswer: number; explanation: string }>> {
  if (!genAI) {
    return getFallbackQuiz(topic, count);
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Generate ${count} multiple choice quiz questions about "${topic}" for programming students.
Return ONLY valid JSON array with this exact structure:
[{"question":"...","options":["A","B","C","D"],"correctAnswer":0,"explanation":"..."}]
correctAnswer is 0-indexed. No markdown, no extra text.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().replace(/```json\n?|\n?```/g, "").trim();
    return JSON.parse(text);
  } catch {
    return getFallbackQuiz(topic, count);
  }
}

export async function getCodingHint(
  problemTitle: string,
  userCode: string,
  language: string
): Promise<string> {
  if (!genAI) {
    return "Try breaking the problem into smaller steps. Check your loop conditions and edge cases. Consider using console.log to debug intermediate values.";
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Give a helpful hint (NOT the full solution) for this coding problem:
Problem: ${problemTitle}
Language: ${language}
User's current code:
${userCode}

Provide a concise hint that guides without giving away the answer.`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch {
    return "Review the problem constraints carefully. Test with the sample input first before submitting.";
  }
}

function getFallbackResponse(prompt: string): string {
  const lower = prompt.toLowerCase();
  if (lower.includes("error") || lower.includes("bug")) {
    return "Check your syntax, variable names, and data types. Use console.log() to trace values at each step. Read the error message carefully — it often tells you the exact line number.";
  }
  if (lower.includes("loop") || lower.includes("array")) {
    return "For array problems, consider using map, filter, or reduce. For loops, ensure your termination condition is correct and you're not modifying the array while iterating.";
  }
  return "I'm here to help! Break your problem into smaller parts, write pseudocode first, then implement step by step. What specific concept are you struggling with?";
}

function getFallbackQuiz(topic: string, count: number) {
  return Array.from({ length: count }, (_, i) => ({
    question: `What is a key concept in ${topic}? (Question ${i + 1})`,
    options: ["Option A", "Option B", "Option C", "Option D"],
    correctAnswer: 0,
    explanation: `This relates to fundamental ${topic} concepts.`,
  }));
}
