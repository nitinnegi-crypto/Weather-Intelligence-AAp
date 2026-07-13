import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/recommendations", async (req, res) => {
    try {
      const { location, forecast, currentWeather } = req.body;
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "Gemini API key is missing" });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are a helpful weather assistant. 
Based on the current weather and 7-day forecast for ${location}, provide a concise summary and 3-4 bullet points of simple planning recommendations (what to wear, what to carry, and best times for activities). Keep it very brief, friendly, and highly practical.

Current Weather:
${JSON.stringify(currentWeather)}

Forecast data:
${JSON.stringify(forecast)}
`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      res.json({ recommendations: response.text });
    } catch (error) {
      console.error("Error generating recommendations:", error);
      res.status(500).json({ error: "Failed to generate recommendations." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
