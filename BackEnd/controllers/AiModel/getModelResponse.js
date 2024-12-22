import { model } from "../../server.js";
export const getResponse = async (req, res) => {
  try {
    const userInput = req.body.newPrompt;

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };
    const chatSession = model.startChat({
      generationConfig,
    });
    const result = await chatSession.sendMessage(userInput);

    // Check if result and text are valid
    if (result && result.response && result.response.text) {
      const mockJsonResponse = JSON.parse(result.response.text().replace("```json", "").replace("```", ""))
      return res.status(200).json({
        data: mockJsonResponse,
      });
    }

    res.status(404).json({
      message: "No result found",
    });
  } catch (error) {
    console.error("Error fetching response:", error.message);
    res.status(500).json({
      message: "An error occurred while processing your request",
      error: error.message,
    });
  }
};

