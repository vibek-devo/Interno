const mongoose = require('mongoose');

const InternSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
		skills: { type: [String], default: [] },
		university: { type: String },
		degreeProgram: { type: String },
		graduationYear: { type: Number },
		internshipStartDate: { type: Date },
		internshipEndDate: { type: Date },
		isPaid: { type: Boolean, default: false },
		stipendAmount: { type: Number, default: 0 },
		mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		currentStatus: { type: String, enum: ['active', 'completed', 'terminated'], default: 'active' }
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Intern', InternSchema);