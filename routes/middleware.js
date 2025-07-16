const User = require('../models/user');
/**
 * Get a particular user middleware
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function getUser(req, res, next) {
	let existingUser;
	try {
		existingUser = await User.findOne({ email: req.body.email });
		if (existingUser == null) {
			return res.status(404).json({ message: 'Cannot find user!' });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}

	res.User = existingUser;
	next();
}

/**
 * Check user role for authorized role
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function checkRole(req, res, next) {
	try {
		const user = await User.findById({ _id: req.user._id });
		if (user.role !== 'admin') {
			return res.status(401).send('Access denied!');
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}

	next();
}

module.exports = { getUser, checkRole };
