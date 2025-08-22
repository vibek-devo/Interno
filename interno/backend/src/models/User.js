const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
		email: { type: String, required: true, unique: true, lowercase: true, index: true },
		passwordHash: { type: String, required: true },
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		role: { type: String, enum: ['admin', 'intern', 'mentor'], required: true, index: true },
		status: { type: String, enum: ['active', 'inactive'], default: 'active' },
		lastLogin: { type: Date }
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);