const express = require('express');
const { authenticate } = require('../middleware/auth');
const DailyProgress = require('../models/DailyProgress');

const router = express.Router();

router.post('/', authenticate, async (req, res) => {
	const body = req.body;
	const created = await DailyProgress.findOneAndUpdate(
		{ intern: body.intern, date: body.date },
		{ $set: body },
		{ new: true, upsert: true }
	);
	return res.status(201).json(created);
});

router.get('/:internId', authenticate, async (req, res) => {
	const items = await DailyProgress.find({ intern: req.params.internId }).sort({ date: -1 });
	return res.json(items);
});

router.put('/:id', authenticate, async (req, res) => {
	const item = await DailyProgress.findByIdAndUpdate(req.params.id, req.body, { new: true });
	if (!item) return res.status(404).json({ error: 'Not found' });
	return res.json(item);
});

module.exports = router;