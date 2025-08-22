const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema(
	{
		intern: { type: mongoose.Schema.Types.ObjectId, ref: 'Intern', required: true },
		type: { type: String, enum: ['certificate', 'offer_letter', 'lor'], required: true },
		generatedAt: { type: Date },
		downloadUrl: { type: String },
		contentHash: { type: String },
		status: { type: String, enum: ['generated', 'sent', 'downloaded', 'verification'], default: 'generated' }
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Document', DocumentSchema);