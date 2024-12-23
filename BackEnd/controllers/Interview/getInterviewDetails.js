import MockInterview from "../../models/MockInterviewModel/mockInterview.js";

export const getInterviweDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const interview = await MockInterview.findOne({ mockInterviewId: id });
    res.status(200).json(interview);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
