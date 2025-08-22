const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
		title: { type: String, required: true },
		message: { type: String },
		type: { type: String, enum: ['task', 'reminder', 'payment', 'other'], default: 'other' },
		isRead: { type: Boolean, default: false },
		linkUrl: { type: String }
	},
	{ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

module.exports = mongoose.model('Notification', NotificationSchema);