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
    const userInput = `Job Position : ${JobPosition}, Job Description: ${JobDescription}, Year of experience:${YearOfExperience}. Depends on the information generate 5 Interview question and answer . generate question and answer as  json field in response example:[{question:ai generated question based on the given information from the user , answer:the answer user give}]`;

    // Fetch the response from the chat session
    const result = await chatSession.sendMessage(userInput);

    // Validate and process the chat response
    if (result?.response?.text) {
      try {
        // Parse the JSON response from the chat model
        const rawResponse = result.response.text();
        const mockJsonResponse = JSON.parse(
          rawResponse.replace("```json", "").replace("```", "")
        );

        // Validate that the parsed response contains valid data
        if (!Array.isArray(mockJsonResponse) || mockJsonResponse.length === 0) {
          return res
            .status(400)
            .json({ message: "Invalid interview questions data." });
        }

        // Create and save the mock interview in the database
        const newMockInterview = new MockInterview({
          mockInterviewId: uniqid(),
          userId: userData.id,
          JobPosition,
          JobDescription,
          YearOfExperience,
          InterviewQuestions: mockJsonResponse,
        });

        const savedInterview = await newMockInterview.save();

        // Respond with the mock interview questions
        return res.status(200).json({
          message: "Mock Interview saved successfully!",
          data: mockJsonResponse,
          mockId: savedInterview.mockInterviewId,
        });
      } catch (saveError) {
        // Handle errors related to saving the mock interview
        console.error("Error saving Mock Interview:", saveError);
        return res.status(500).json({
          message: "Error saving Mock Interview to the database.",
          error: saveError.message,
        });
      }
    } else {
      // Handle cases where the chat response is invalid or missing
      return res
        .status(404)
        .json({ message: "No valid response from the chat model." });
    }
  } catch (error) {
    // Handle any other errors that occur during processing
    console.error("Error processing request:", error.message);
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
    const feedbackPrompt = `Question: ${question}, Answer: ${userAnswer}. Please provide a rating from 1 to 10 and feedback for improvement. Return the response in JSON format with only the following fields: "rating" and "feedback".the feedback length should be precise and to the point with area of focus under not exceeding 100 words. Example: {"rating": "8", "feedback": "Your answer is good, but..."}`;
    const result = await chatSession.sendMessage(feedbackPrompt);
    if (result?.response?.candidates?.[0]?.content?.parts?.[0]?.text) {
      const rawFeedback = result.response.candidates[0].content.parts[0].text;

      // Parse the JSON string to extract rating and feedback
      const feedbackJson = await JSON.parse(
        rawFeedback.replace("```json", "").replace("```", "")
      );
      console.log(feedbackJson);
      // Validate that the parsed response contains the required fields
      if (feedbackJson) {
        try {
            const updateFeedback = {
            userAnswer,
            question,
            rating: feedbackJson.rating,
            feedback: feedbackJson.feedback,
            };
            const questionData = await UserAnswerModel.findOneAndUpdate(
            { questionId: questionNumber, mockInterviewId: mockId },
            { $set: updateFeedback },
            { new: true, upsert: true } 
            );

          console.log(questionData);

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
