import MockInterview from "../../models/MockInterviewModel/mockInterview.js";
import uniqid from "uniqid";
import { model } from "../../server.js";

export const getResponse = async (req, res) => {
  try {
    // Extract user input and prompt details from the request body
    // const userInput = req.body.newPrompt;
    const { JobPosition, JobDescription, YearOfExperience } = req.body.prompt;
    const userInput = `Job Position : ${JobPosition}, Job Description: ${JobDescription}, Year of experience:${YearOfExperience}. Depends on the information generate 5 Interview question and answer . generate question and answer as  json field in response example:[{question:ai generated question based on the given information from the user , answer:the answer user give}]`

    // Configuration for the chat generation model
    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 4000,
      responseMimeType: "text/plain",
    };

    // Initialize a chat session with the provided configuration
    const chatSession = model.startChat({ generationConfig });

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
          return res.status(400).json({ message: "Invalid interview questions data." });
        }

        // Create and save the mock interview in the database
        const newMockInterview = new MockInterview({
          mockInterviewId: uniqid(),
          JobPosition,
          JobDescription,
          YearOfExperience,
          InterviewQuestions: mockJsonResponse,
        });

        const savedInterview = await newMockInterview.save();
        console.log("Mock Interview saved successfully!", savedInterview);

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
      return res.status(404).json({ message: "No valid response from the chat model." });
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
