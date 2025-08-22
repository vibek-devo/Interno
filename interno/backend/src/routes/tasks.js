const express = require('express');
const { authenticate, requireRole } = require('../middleware/auth');
const Task = require('../models/Task');

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
	const { status, intern } = req.query;
	const filter = {};
	if (status) filter.status = status;
	if (intern) filter.assignedTo = intern;
	const tasks = await Task.find(filter).sort({ createdAt: -1 });
	return res.json(tasks);
});

router.post('/', authenticate, requireRole('admin', 'mentor'), async (req, res) => {
	const task = await Task.create({ ...req.body, createdBy: req.user.id });
	return res.status(201).json(task);
});

router.get('/:id', authenticate, async (req, res) => {
	const task = await Task.findById(req.params.id);
	if (!task) return res.status(404).json({ error: 'Not found' });
	return res.json(task);
});

router.put('/:id', authenticate, requireRole('admin', 'mentor'), async (req, res) => {
	const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
	if (!task) return res.status(404).json({ error: 'Not found' });
	return res.json(task);
});

router.put('/:id/status', authenticate, async (req, res) => {
	const task = await Task.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
	if (!task) return res.status(404).json({ error: 'Not found' });
	return res.json(task);
});

router.delete('/:id', authenticate, requireRole('admin', 'mentor'), async (req, res) => {
	await Task.findByIdAndDelete(req.params.id);
	return res.json({ ok: true });
});

module.exports = router;