const express = require("express");
const { ai } = require("../config/gemini.js");
const Property = require("../models/Property.js");

const router = express.Router();

const memory = {};

async function callAI(prompt, retries = 3) {
  try {
    const res = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return res.text;
  } catch (err) {
    if (retries > 0) {
      await new Promise((r) => setTimeout(r, 1000));
      return callAI(prompt, retries - 1);
    }
    throw err;
  }
}

function safeJSON(text) {
  return JSON.parse(
    text.replace(/```json/g, "").replace(/```/g, "").trim()
  );
}

function rankProperty(property, filters) {
  let score = 0;

  if (filters.city && property.location.city?.toLowerCase() === filters.city.toLowerCase()) {
    score += 40;
  }

  if (filters.propertyType && property.type === filters.propertyType) {
    score += 20;
  }

  if (filters.bedNum && property.bedNum >= filters.bedNum) {
    score += 15;
  }

  if (filters.maxPrice && property.price <= filters.maxPrice) {
    score += 15;
  }

  if (filters.bathNum && property.bathNum >= filters.bathNum) {
    score += 10;
  }

  return { ...property._doc, score };
}

router.post("/test", async (req, res, next) => {
  try {
    const { message, sessionId = "default" } = req.body;

    const previousContext = memory[sessionId] || "";

    const prompt = `
You are a REAL ESTATE AI AGENT for HavenSpace.

You remember previous conversation:
${previousContext}

TASK:
- Extract intent
- Extract filters
- Detect if user is refining previous search ("cheaper", "more rooms", etc.)

INTENTS:
- search
- refine
- recommend
- invalid

RULES:
- Return ONLY valid JSON
- Never hallucinate
- Never invent cities

OUTPUT:

{
  "intent": "",
  "message": "",
  "refinement": true,
  "filters": {
    "city": null,
    "propertyType": null,
    "minPrice": null,
    "maxPrice": null,
    "bedNum": null,
    "bathNum": null
  }
}

User:
${message}
`;

    const aiText = await callAI(prompt);
    const parsed = safeJSON(aiText);

    const { intent, filters, message: aiMessage } = parsed;

    if (intent === "invalid") {
      return res.json({
        success: true,
        intent,
        message:
          "Ja sam AI asistent za nekretnine. Mogu da pomognem oko pretrage stanova i kuća.",
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

    let properties = await Property.find(query);

    properties = properties
      .map((p) => rankProperty(p, filters))
      .sort((a, b) => b.score - a.score);

    if (properties.length === 0) {
      properties = await Property.find({
        status: "active",
        $or: [
          { title: { $regex: message, $options: "i" } },
          { description: { $regex: message, $options: "i" } },
        ],
      });

      return res.json({
        success: true,
        intent: "recommend",
        message: "Nema tačnih rezultata, ali evo sličnih nekretnina.",
        properties,
      });
    }

    const responsePrompt = `
You are a real estate assistant.

User asked: ${message}
We found: ${properties.length} properties.

Write a short helpful response (max 2 sentences).
Be natural, like Airbnb assistant.
`;

    const aiResponse = await callAI(responsePrompt);

    memory[sessionId] = `${message} → ${JSON.stringify(filters)}`;

    return res.json({
      success: true,
      intent,
      message: aiResponse,
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