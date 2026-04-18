import { GoogleGenAI } from "@google/genai";
async function test() {
  try {
    const ai = new GoogleGenAI({});
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Hello"
    });
    console.log("Success:", response.text);
  } catch (e) {
    console.error("Error:", e.message);
  }
}
test();
