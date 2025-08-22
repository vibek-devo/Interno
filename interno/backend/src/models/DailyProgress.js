const mongoose = require('mongoose');

const DailyProgressSchema = new mongoose.Schema(
	{
		intern: { type: mongoose.Schema.Types.ObjectId, ref: 'Intern', required: true, index: true },
		date: { type: Date, required: true, index: true },
		hoursWorked: { type: Number, default: 0 },
		notes: { type: String },
		tasksCompleted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
		challengesFaced: { type: String }
	},
	{ timestamps: true }
);

DailyProgressSchema.index({ intern: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('DailyProgress', DailyProgressSchema);