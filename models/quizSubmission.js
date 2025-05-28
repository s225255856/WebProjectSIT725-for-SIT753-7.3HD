const mongoose = require('mongoose');

const quizSubmissionSchema = new mongoose.Schema({
  username: String,
  age: String,
  budget: String,
  recipient: String,
  occasion: String,
  personality: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  isDeleted: {
    type: Boolean,
    default: false // 🆕 Soft delete marker
  }
});

module.exports = mongoose.model('QuizSubmission', quizSubmissionSchema, 'quizSubmissions');

