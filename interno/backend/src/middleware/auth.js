const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
	const authHeader = req.headers.authorization || '';
	const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
	if (!token) return res.status(401).json({ error: 'Unauthorized' });
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret_change_me');
		req.user = decoded;
		return next();
	} catch (err) {
		return res.status(401).json({ error: 'Invalid token' });
	}
}

function requireRole(...roles) {
	return function (req, res, next) {
		if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
		if (!roles.includes(req.user.role)) return res.status(403).json({ error: 'Forbidden' });
		return next();
	};
}

module.exports = { authenticate, requireRole };