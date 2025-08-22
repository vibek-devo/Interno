const mongoose = require('mongoose');

async function connect() {
	const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/interno';
	mongoose.set('strictQuery', true);
	try {
		await mongoose.connect(uri);
		console.log('MongoDB connected');
	} catch (err) {
		console.warn('MongoDB connection failed, continuing without DB. Set MONGODB_URI to connect.');
	}
}

module.exports = { connect };
