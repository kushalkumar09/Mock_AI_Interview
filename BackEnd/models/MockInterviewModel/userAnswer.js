import mongoose from 'mongoose';

const userAnswerSchema = new mongoose.Schema({
  mockInterviewId: {
    type: String,
    required: true,
    trim: true,
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
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Create the UserAnswer model
const UserAnswer = mongoose.model('User Answer', userAnswerSchema);

export default UserAnswer;