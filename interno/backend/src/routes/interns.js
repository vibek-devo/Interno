const express = require('express');
const { authenticate, requireRole } = require('../middleware/auth');
const Intern = require('../models/Intern');
const Task = require('../models/Task');
const DailyProgress = require('../models/DailyProgress');
const Document = require('../models/Document');

const router = express.Router();

router.get('/', authenticate, requireRole('admin', 'mentor'), async (_req, res) => {
	const list = await Intern.find().populate('user', 'email firstName lastName role');
	return res.json(list);
});

router.get('/me', authenticate, async (req, res) => {
	const intern = await Intern.findOne({ user: req.user.id }).populate('user', 'email firstName lastName role');
	if (!intern) return res.status(404).json({ error: 'Intern record not found' });
	return res.json(intern);
});

router.post('/', authenticate, requireRole('admin'), async (req, res) => {
	const created = await Intern.create(req.body);
	return res.status(201).json(created);
});

router.get('/:id', authenticate, async (req, res) => {
	const intern = await Intern.findById(req.params.id).populate('user', 'email firstName lastName role');
	if (!intern) return res.status(404).json({ error: 'Not found' });
	return res.json(intern);
});

router.put('/:id', authenticate, requireRole('admin', 'mentor'), async (req, res) => {
	const updated = await Intern.findByIdAndUpdate(req.params.id, req.body, { new: true });
	if (!updated) return res.status(404).json({ error: 'Not found' });
	return res.json(updated);
});

router.get('/:id/tasks', authenticate, async (req, res) => {
	const tasks = await Task.find({ assignedTo: req.params.id }).sort({ createdAt: -1 });
	return res.json(tasks);
});

router.get('/:id/progress', authenticate, async (req, res) => {
	const items = await DailyProgress.find({ intern: req.params.id }).sort({ date: -1 });
	return res.json(items);
});

router.get('/:id/documents', authenticate, async (req, res) => {
	const docs = await Document.find({ intern: req.params.id }).sort({ createdAt: -1 });
	return res.json(docs);
});

module.exports = router;