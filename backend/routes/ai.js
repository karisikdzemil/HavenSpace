const express = require("express");
const { ai } = require("../config/gemini");
const Property = require("../models/Property");

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
  try {
    return JSON.parse(
      text.replace(/```json/g, "").replace(/```/g, "").trim()
    );
  } catch {
    return {
      intent: "search",
      refinement: false,
      filters: {
        city: null,
        propertyType: null,
        minPrice: null,
        maxPrice: null,
        bedNum: null,
        bathNum: null,
      },
    };
  }
}

function rankProperty(property, filters) {
  let score = 0;

  if (
    filters.city &&
    property.location?.city?.toLowerCase() === filters.city.toLowerCase()
  ) {
    score += 40;
  }

  if (
    filters.propertyType &&
    property.type === filters.propertyType
  ) {
    score += 20;
  }

  if (
    filters.bedNum &&
    property.bedNum >= filters.bedNum
  ) {
    score += 15;
  }

  if (
    filters.bathNum &&
    property.bathNum >= filters.bathNum
  ) {
    score += 10;
  }

  if (
    filters.maxPrice &&
    property.price <= filters.maxPrice
  ) {
    score += 15;
  }

  return {
    ...property._doc,
    score,
  };
}

router.post("/ai-search", async (req, res, next) => {
  try {
    const {
      message,
      sessionId = "default",
    } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const previousContext = memory[sessionId] || [];

    const prompt = `
You are a REAL ESTATE AI AGENT.

Conversation history:
${JSON.stringify(previousContext)}

Extract filters from user message.

Allowed property types:
- house
- apartment

Return ONLY JSON.

{
  "intent":"search",
  "refinement":false,
  "filters":{
    "city":null,
    "propertyType":null,
    "minPrice":null,
    "maxPrice":null,
    "bedNum":null,
    "bathNum":null
  }
}

User:
${message}
`;

    const aiText = await callAI(prompt);

    const parsed = safeJSON(aiText);

    const filters =
      parsed.filters || {};

    const query = {
      status: "active",
    };

    if (filters.city) {
      query["location.city"] = {
        $regex: filters.city,
        $options: "i",
      };
    }

    if (filters.propertyType) {
      query.type = filters.propertyType;
    }

    if (
      filters.minPrice ||
      filters.maxPrice
    ) {
      query.price = {};

      if (filters.minPrice) {
        query.price.$gte =
          Number(filters.minPrice);
      }

      if (filters.maxPrice) {
        query.price.$lte =
          Number(filters.maxPrice);
      }
    }

    if (filters.bedNum) {
      query.bedNum = {
        $gte: Number(filters.bedNum),
      };
    }

    if (filters.bathNum) {
      query.bathNum = {
        $gte: Number(filters.bathNum),
      };
    }

    let properties =
      await Property.find(query);

    properties = properties
      .map((p) =>
        rankProperty(p, filters)
      )
      .sort(
        (a, b) => b.score - a.score
      );

    if (!memory[sessionId]) {
      memory[sessionId] = [];
    }

    memory[sessionId].push({
      user: message,
      filters,
    });

    memory[sessionId] =
      memory[sessionId].slice(-5);

    if (properties.length === 0) {
      return res.json({
        success: true,
        intent: "recommend",
        message:
          "No exact matches found. Try broadening your search criteria.",
        count: 0,
        properties: [],
        filters,
      });
    }

    const responsePrompt = `
User searched:
${message}

Properties found:
${properties.length}

Write a short real estate assistant response.
Maximum 2 sentences.
`;

    const aiResponse =
      await callAI(responsePrompt);

    return res.json({
      success: true,
      intent: parsed.intent || "search",
      message: aiResponse,
      count: properties.length,
      properties,
      filters,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;