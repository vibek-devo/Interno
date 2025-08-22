const express = require('express');
const { authenticate, requireRole } = require('../middleware/auth');
const Intern = require('../models/Intern');
const Task = require('../models/Task');
const DailyProgress = require('../models/DailyProgress');

const router = express.Router();

router.get('/metrics', authenticate, requireRole('admin'), async (_req, res) => {
	const [interns, tasks, progress] = await Promise.all([
		Intern.countDocuments(),
		Task.countDocuments(),
		DailyProgress.countDocuments()
	]);
	return res.json({ interns, tasks, progress });
});

router.get('/reports', authenticate, requireRole('admin'), async (_req, res) => {
	return res.json({ ok: true, report: 'Report generation stub' });
});

router.post('/notifications', authenticate, requireRole('admin'), async (_req, res) => {
	return res.json({ ok: true, message: 'Bulk notifications sent (stub)' });
});

module.exports = router;