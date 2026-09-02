import { Router } from "express";
import { analyzeMentalHealth } from "../gemini";

const router = Router();

router.post("/mental-health", async (req, res) => {
  try {
    console.log("Raw body:", req.body);

    let body = req.body;

    // Convert Buffer to JSON
    if (Buffer.isBuffer(body)) {
      body = JSON.parse(body.toString("utf8"));
    }

    const { answers } = body;

    console.log("Parsed answers:", answers);

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({
        error: "Invalid answers payload",
      });
    }

    const userText = answers
      .map(
        (a: any, index: number) =>
          `Q${index + 1}: ${a.question}\nAnswer: ${a.answer}`
      )
      .join("\n\n");

    console.log("User text:", userText);

    const result = await analyzeMentalHealth(userText);

    return res.json(result);

  } catch (error: any) {
    console.error("Mental health API error:", error);

    return res.status(500).json({
      success: false,
      error: "Failed to analyze mental health",
    });
  }
});

export default router;
