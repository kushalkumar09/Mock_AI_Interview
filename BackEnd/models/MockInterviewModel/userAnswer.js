import mongoose from 'mongoose';

const userAnswerSchema = new mongoose.Schema({
  mockInterviewId: {
    type: String,
    required: true,
    trim: true,
  },
  questionId: {
    type: Number,
    required: true,
  },
  userAnswer: {
    type: String,
    required: true,
    trim: true,
  },
  question: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Create the UserAnswer model
const UserAnswerModel = mongoose.model('UserAnswer', userAnswerSchema);

export default UserAnswerModel;