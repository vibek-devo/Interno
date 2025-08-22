const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
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

module.exports = router;