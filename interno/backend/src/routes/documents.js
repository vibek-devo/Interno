const express = require('express');
const { authenticate, requireRole } = require('../middleware/auth');
const Document = require('../models/Document');

const router = express.Router();

router.post('/generate-certificate/:internId', authenticate, requireRole('admin', 'mentor'), async (req, res) => {
	const doc = await Document.create({ intern: req.params.internId, type: 'certificate', generatedAt: new Date() });
	return res.status(201).json(doc);
});

router.post('/generate-lor/:internId', authenticate, requireRole('admin', 'mentor'), async (req, res) => {
	const doc = await Document.create({ intern: req.params.internId, type: 'lor', generatedAt: new Date() });
	return res.status(201).json(doc);
});

router.get('/:id', authenticate, async (req, res) => {
	const doc = await Document.findById(req.params.id);
	if (!doc) return res.status(404).json({ error: 'Not found' });
	return res.json(doc);
});

router.get('/:id/download', authenticate, async (req, res) => {
	const doc = await Document.findById(req.params.id);
	if (!doc) return res.status(404).json({ error: 'Not found' });
	return res.json({ ok: true, message: 'Download link stub', id: doc.id });
});

module.exports = router;