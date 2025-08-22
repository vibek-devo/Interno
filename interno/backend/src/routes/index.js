const express = require('express');
const auth = require('./auth');
const interns = require('./interns');
const tasks = require('./tasks');
const progress = require('./progress');
const documents = require('./documents');
const admin = require('./admin');

const router = express.Router();

router.use('/auth', auth);
router.use('/interns', interns);
router.use('/tasks', tasks);
router.use('/progress', progress);
router.use('/documents', documents);
router.use('/admin', admin);

module.exports = router;