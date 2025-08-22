const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema(
	{
		intern: { type: mongoose.Schema.Types.ObjectId, ref: 'Intern', required: true, index: true },
		givenBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
		rating: { type: Number, min: 1, max: 5, required: true },
		strengths: { type: String },
		areasForImprovement: { type: String },
		isVisibleToIntern: { type: Boolean, default: true }
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Feedback', FeedbackSchema);