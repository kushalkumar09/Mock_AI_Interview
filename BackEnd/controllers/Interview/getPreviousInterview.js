import MockInterview from "../../models/MockInterviewModel/mockInterview.js";

export const getPreviousInterviews = async (req, res) => {
    try {
        const userData = req.user;
        if(!userData){
            return res.status(401).json({ message: "Unauthorized access" });
        }
        const allInterviews = await MockInterview.find({userId: userData.id});
        return res.status(200).json({ message: "All interviews", data: allInterviews });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching interviews" });
    }
};
