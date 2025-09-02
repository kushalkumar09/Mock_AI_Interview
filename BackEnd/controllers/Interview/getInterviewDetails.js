import MockInterview from "../../models/MockInterviewModel/mockInterview.js";
import UserAnswerModel from "../../models/MockInterviewModel/userAnswer.js";
import User from "../../models/UserModel/user.js";

export const getInterviweDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const interview = await MockInterview.findOne({ mockInterviewId: id });
    res.status(200).json(interview);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const GetInterviewFeedback = async (req, res) => {
  try {
    const userData = req.user;
    if (!userData) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    const { id } = req.params;
    const interview = await UserAnswerModel.find({ mockInterviewId: id });
    console.log("Interview : ",interview);
    res.status(200).json({
      message: "Feedback fetched successfully!",
      data: interview,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
