require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const { connect } = require('./config/db');

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(compression());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 200 }));
app.use('/api', require('./routes'));

app.get('/health', (_req, res) => {
	res.json({ ok: true, service: 'interno-backend' });
});

const port = Number(process.env.PORT || 4000);
connect().finally(() => {
	app.listen(port, () => {
		console.log(`Backend running on :${port}`);
	});
});

module.exports = app;
