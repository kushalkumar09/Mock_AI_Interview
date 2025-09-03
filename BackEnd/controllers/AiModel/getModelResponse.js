import MockInterview from "../../models/MockInterviewModel/mockInterview.js";
import uniqid from "uniqid";
import { chatSession } from "../../server.js";
import UserAnswerModel from "../../models/MockInterviewModel/userAnswer.js";

export const getResponse = async (req, res) => {
  try {
    const userData = req.user;
    if (!userData) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    const { JobPosition, JobDescription, YearOfExperience } = req.body.prompt;

    if (!JobPosition || !JobDescription || !YearOfExperience) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const userInput = `Job Position: ${JobPosition}, Job Description: ${JobDescription}, Year of experience: ${YearOfExperience}.
    Based on this information generate 5 interview question and answer pairs in JSON format:
    Example: [{"question": "AI-generated question", "answer": "expected user answer"}]`;

    let result;
    try {
      result = await chatSession.sendMessage(userInput);
    } catch (apiError) {
      console.error("Gemini API Error:", apiError);

      if (apiError.message.includes("503")) {
        return res.status(503).json({ message: "AI model is overloaded. Please try again later." });
      }
      if (apiError.message.includes("429")) {
        return res.status(429).json({ message: "Too many requests. Please slow down." });
      }

      return res.status(500).json({ message: "Error communicating with AI service.", error: apiError.message });
    }

    // Validate and process the chat response
    if (result?.response?.text) {
      try {
        const rawResponse = result.response.text();
        const cleanResponse = rawResponse.replace(/```json|```/g, "").trim();

        let mockJsonResponse;
        try {
          mockJsonResponse = JSON.parse(cleanResponse);
        } catch (parseError) {
          console.error("JSON Parse Error:", parseError, "Raw:", rawResponse);
          return res.status(400).json({
            message: "AI returned invalid JSON. Please try again.",
            error: parseError.message,
          });
        }

        if (!Array.isArray(mockJsonResponse) || mockJsonResponse.length === 0) {
          return res.status(400).json({ message: "AI did not generate valid interview questions." });
        }

        // Save the interview in DB
        const newMockInterview = new MockInterview({
          mockInterviewId: uniqid(),
          userId: userData.id,
          JobPosition,
          JobDescription,
          YearOfExperience,
          InterviewQuestions: mockJsonResponse,
        });

        const savedInterview = await newMockInterview.save();

        return res.status(200).json({
          message: "Mock Interview saved successfully!",
          data: mockJsonResponse,
          mockId: savedInterview.mockInterviewId,
        });
      } catch (saveError) {
        console.error("Error saving Mock Interview:", saveError);
        return res.status(500).json({
          message: "Error saving Mock Interview to the database.",
          error: saveError.message,
        });
      }
    } else {
      return res.status(404).json({ message: "No valid response from the AI model." });
    }
  } catch (error) {
    console.error("Server Error:", error.message);
    return res.status(500).json({
      message: "An error occurred while processing your request.",
      error: error.message,
    });
  }
};

export const getFeedback = async (req, res) => {
  try {
    const userData = req.user;
    if (!userData) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    const { question, userAnswer, mockId, questionNumber } = req.body.prompt;
    const feedbackPrompt = `Act as an expert technical recruiter and interview coach. 
You are evaluating a candidate’s answer to an interview question.

Evaluation Criteria:
1. Clarity & Conciseness – Is the answer easy to understand?
2. Correctness & Accuracy – Is the technical information correct?
3. Completeness – Does it fully address the question?
4. Structure – Is the answer logically organized?

Scoring Rules:
- "rating" must be an integer from 0 to 100.
- If the candidate's answer is empty, irrelevant, less than 10 words, or indicates the question was skipped → 
  Return: 
  {
    "rating": "0",
    "AiAnswer": "An ideal example answer the candidate can learn from.",
    "feedback": "Your answer was not provided. Please give a complete response to get evaluated."
  }
- If the answer is perfect (clear, correct, complete, well-structured) → "rating": "100".
- If the answer is partially correct/incomplete → "rating" between 20–80.
- If the answer is mostly incorrect/off-topic → "rating" between 1–20.

Response Format:
Return ONLY valid JSON with exactly these three fields:
{
  "rating": "<number between 0-100>",
  "AiAnswer": "An ideal example response.",
  "feedback": "Constructive feedback in under 100 words."
}

Question: ${question}
Candidate's Answer: ${userAnswer}`;
    const result = await chatSession.sendMessage(feedbackPrompt);
    if (result?.response?.candidates?.[0]?.content?.parts?.[0]?.text) {
      const rawFeedback = result.response.candidates[0].content.parts[0].text;

      // Parse the JSON string to extract rating and feedback
      const feedbackJson = await JSON.parse(
        rawFeedback.replace("```json", "").replace("```", "")
      );
      // Validate that the parsed response contains the required fields
      if (feedbackJson) {
        try {
          const updateFeedback = {
            userAnswer,
            question,
            rating: feedbackJson.rating,
            feedback: feedbackJson.feedback,
            AiAnswer: feedbackJson.AiAnswer,
          };
          const questionData = await UserAnswerModel.findOneAndUpdate(
            { questionId: questionNumber, mockInterviewId: mockId },
            { $set: updateFeedback },
            { new: true, upsert: true }
          );

          if (questionData) {
            await questionData.save();
            return res.status(200).json({
              message: "Feedback updated successfully!",
              newFeedback: questionData,
            });
          }
        } catch (saveError) {
          console.error("Error saving feedback:", saveError);
          return res.status(500).json({
            message: "Error saving feedback to the database.",
            error: saveError.message,
          });
        }
        return res.status(200).json({
          rating: feedbackJson.rating,
          feedback: feedbackJson.feedback,
        });
      } else {
        return res.status(400).json({ message: "Invalid feedback format." });
      }
    } else {
      return res
        .status(404)
        .json({ message: "No valid response from the chat model." });
    }
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while processing your request.",
      error: error.message,
    });
  }
};
