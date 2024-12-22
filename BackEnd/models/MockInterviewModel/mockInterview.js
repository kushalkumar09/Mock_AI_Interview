import mongoose from "mongoose";

const mockInterviewSchema = new mongoose.Schema(
  {
    mockInterviewId: {
      type: String,
      required: true,
      unique: true,
    },
    JobPosition: {
      type: String,
      required: true,
    },
    JobDescription: {
      type: String,
      required: true,
    },
    YearOfExperience: {
      type: Number,
      required: true,
    },
    InterviewQuestions: [
      {
        question: {
          type: String,
          required: true,
        },
        answer: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const MockInterview = mongoose.model("MockInterview", mockInterviewSchema);

export default MockInterview;
