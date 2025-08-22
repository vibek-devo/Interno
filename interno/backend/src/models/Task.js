const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String },
		createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
		assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Intern', required: true },
		dueDate: { type: Date },
		status: { type: String, enum: ['pending', 'in_progress', 'completed', 'overdue'], default: 'pending', index: true },
		priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
		projectId: { type: String }
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Task', TaskSchema);