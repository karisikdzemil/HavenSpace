const express = require("express");
const { ai } = require("../config/gemini.js");
const Property = require("../models/Property.js");

const router = express.Router();

async function callAI(prompt, retries = 3) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (err) {
    if (retries > 0) {
      console.log("AI retrying...", retries);
      await new Promise((r) => setTimeout(r, 1000));
      return callAI(prompt, retries - 1);
    }
    throw err;
  }
}

function parseAI(text) {
  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
}

router.post("/test", async (req, res, next) => {
  try {
    const { message } = req.body;

    const prompt = `
You are a REAL ESTATE AI ASSISTANT for HavenSpace.

You have 3 jobs:

1. Detect user intent
2. Extract search filters (if applicable)
3. Decide response type

IMPORTANT RULES:
- Return ONLY valid JSON
- Do NOT hallucinate data
- Do NOT invent cities or properties
- If request is NOT real estate related → intent = "invalid"

INTENTS:
- "search" → user is looking for properties
- "recommend" → no exact match but suggest similar
- "invalid" → not related to real estate

OUTPUT FORMAT:

{
  "intent": "search" | "recommend" | "invalid",
  "message": "",
  "filters": {
    "city": null,
    "propertyType": null,
    "minPrice": null,
    "maxPrice": null,
    "bedNum": null,
    "bathNum": null,
    "minArea": null,
    "maxArea": null,
    "garage": null,
    "status": "active"
  }
}

User input:
${message}
`;

    const aiText = await callAI(prompt);
    const aiResponse = parseAI(aiText);

    const { intent, filters, message: aiMessage } = aiResponse;

    if (intent === "invalid") {
      return res.json({
        success: true,
        intent,
        message:
          "Ja sam AI asistent za nekretnine. Mogu da vam pomognem da pronađete stanove i kuće.",
        properties: [],
      });
    }

    const query = { status: "active" };

    if (filters.city) {
      query["location.city"] = new RegExp(filters.city, "i");
    }

    if (filters.propertyType) {
      query.type = filters.propertyType;
    }

    if (filters.bedNum) {
      query.bedNum = { $gte: filters.bedNum };
    }

    if (filters.maxPrice) {
      query.price = { $lte: filters.maxPrice };
    }

    let properties = await Property.find(query);

    if (properties.length === 0 && intent !== "invalid") {
      const fallback = await Property.find({
        status: "active",
      }).limit(3);

      const fallbackMessage = `Nemamo tačne nekretnine za vaš zahtev, ali evo nekoliko sličnih preporuka.`;

      return res.json({
        success: true,
        intent: "recommend",
        message: fallbackMessage,
        filters,
        properties: fallback,
      });
    }

    const responsePrompt = `
You are a real estate assistant.

User query: ${message}

We found ${properties.length} properties.

Write a SHORT natural response (1-3 sentences):
- mention how many properties found
- be helpful
- do NOT exaggerate
- if 0 results, politely say no matches

Return ONLY text.
`;

    const aiMessageFinal = await callAI(responsePrompt);

    return res.json({
      success: true,
      intent,
      message: aiMessageFinal,
      count: properties.length,
      properties,
      filters,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;