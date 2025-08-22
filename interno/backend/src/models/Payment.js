const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema(
	{
		intern: { type: mongoose.Schema.Types.ObjectId, ref: 'Intern', required: true },
		amount: { type: Number, required: true },
		paymentDate: { type: Date },
		paymentMethod: { type: String },
		status: { type: String, enum: ['pending', 'processed', 'failed'], default: 'pending' },
		transactionReference: { type: String },
		periodStartDate: { type: Date },
		periodEndDate: { type: Date },
		notes: { type: String }
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Payment', PaymentSchema);