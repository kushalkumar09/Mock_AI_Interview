import MockInterview from "../../models/MockInterviewModel/mockInterview.js";
import UserAnswerModel from "../../models/MockInterviewModel/userAnswer.js";

export const getPreviousInterviews = async (req, res) => {
    try {
        const userData = req.user;
        if(!userData){
            return res.status(401).json({ message: "Unauthorized access" });
        }
        const search = req.query.search || "";

        const filter = { userId: userData.id };
        if (search) {
            filter.$or = [
                { JobPosition: { $regex: search, $options: "i" } },
                { JobDescription: { $regex: search, $options: "i" } },
                { "InterviewQuestions.question": { $regex: search, $options: "i" } },
            ];
        }
        const allInterviews = await MockInterview.find(filter).sort({ updatedAt: -1 });
        return res.status(200).json({ message: "All interviews", data: allInterviews });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching interviews" });
    }
};

export const updateInterviewScore = async (req, res) => {
  try {
    const userData = req.user;
    if (!userData) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    const { id } = req.params;
    const interview = await MockInterview.findOne({ mockInterviewId: id });
    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }
    const answerFeedbacks = await UserAnswerModel.find({ mockInterviewId: id });
     // Recalculate total user score
    const userScore = answerFeedbacks.reduce((sum, answer) => {
      return (typeof answer.rating === "number") ? sum + answer.rating : sum;
    }, 0);
    interview.InterviewScore.userScore = userScore;
    await interview.save();
    return res.status(200).json({ message: "Interview score updated successfully", data: interview });
  } catch (error) {
    return res.status(500).json({ message: "Error updating interview score" });
  }
};
