const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Intern = require('../models/Intern');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) return res.status(400).json({ error: 'Missing credentials' });
	const user = await User.findOne({ email: email.toLowerCase() });
	if (!user) return res.status(401).json({ error: 'Invalid credentials' });
	const ok = await bcrypt.compare(password, user.passwordHash);
	if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
	const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET || 'dev_secret_change_me', { expiresIn: '7d' });
	user.lastLogin = new Date();
	await user.save();
	return res.json({ token, user: { id: user._id, email: user.email, role: user.role, firstName: user.firstName, lastName: user.lastName } });
});

router.post('/forgot-password', async (_req, res) => {
	return res.json({ ok: true, message: 'Reset link sent (stub)' });
});

router.post('/reset-password', async (_req, res) => {
	return res.json({ ok: true, message: 'Password reset (stub)' });
});

router.post('/change-password', authenticate, async (_req, res) => {
	return res.json({ ok: true, message: 'Password changed (stub)' });
});

// Dev-only: seed default users for quick start
router.post('/seed-dev', async (_req, res) => {
	if (process.env.NODE_ENV === 'production') return res.status(403).json({ error: 'Forbidden' });
	const ensureUser = async (email, role, firstName, lastName, password) => {
		let user = await User.findOne({ email });
		if (!user) {
			const passwordHash = await bcrypt.hash(password, 10);
			user = await User.create({ email, passwordHash, firstName, lastName, role });
		}
		return user;
	};

	const admin = await ensureUser('admin@interno.dev', 'admin', 'System', 'Admin', 'Admin@123');
	const internUser = await ensureUser('intern@interno.dev', 'intern', 'Irene', 'Intern', 'Intern@123');
	let intern = await Intern.findOne({ user: internUser._id });
	if (!intern) {
		intern = await Intern.create({ user: internUser._id, university: 'Interno U', degreeProgram: 'CS', currentStatus: 'active' });
	}
	return res.json({ ok: true, admin: { email: admin.email, password: 'Admin@123' }, intern: { email: internUser.email, password: 'Intern@123', internId: intern._id } });
});

module.exports = router;