const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { getUser } = require('./middleware');
const userRole = require('../constants/userRole');

/**
 * Get all users
 *
 * @access private
 * @returns {Object}
 */
router.post(
	'/all',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		if (req.user.role !== userRole.ADMIN) {
			return res.status(403).send('Access denied!');
		}
		try {
			const users = await User.find({}, { password: 0 });
			res.status(200).json(users);
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	}
);

/**
 * Login a user via passport and issue JWT
 *
 * @access public
 * @returns {Object}
 */
router.post('/login', passport.authenticate('login'), (req, res) => {
	if (req.user) {
		const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
		res.status(200).send({
			token,
			email: req.user.email,
			name: req.user.name,
			alias: req.user.alias,
			role: req.user.role,
			grade: req.user.grade,
		});
	} else {
		return res.status(500).json({ message: 'Authentication failed.' });
	}
});

/**
 * Verify a user via JWT
 *
 * @access public
 * @returns {Object}
 */
router.post(
	'/verifyToken',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		if (req.user) {
			res.status(200).send({
				email: req.user.email,
				name: req.user.name,
				alias: req.user.alias,
				role: req.user.role,
				grade: req.user.grade,
			});
		} else {
			return res.status(500).json({ message: 'Verification failed.' });
		}
	}
);

/**
 * Register a user
 *
 * @access public
 * @returns {Object}
 */
router.post('/register', checkUser, async (req, res) => {
	try {
		const hashPassword = await bcrypt.hash(req.body.password, 10);
		const tempUser = new User({
			email: req.body.email,
			password: hashPassword,
			role: userRole.USER,
		});
		const newUser = await tempUser.save();
		const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
		res.status(200).send({
			token,
			email: newUser.email,
			name: newUser.name,
			alias: newUser.alias,
			role: newUser.role,
			grade: newUser.grade,
		});
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

/**
 * Set role to a user by admin
 *
 * @access private
 * @returns {Object}
 */

router.patch(
	'/setRole',
	passport.authenticate('jwt', { session: false }),
	getUser,
	async (req, res) => {
		if (req.user.role !== userRole.ADMIN) {
			return res.status(403).send('Access denied!');
		}
		if (req.body.role != null) {
			res.User.role = req.body.role;
		}
		try {
			const updatedUser = await res.User.save();
			res.status(200).json({
				email: updatedUser.email,
				name: updatedUser.name,
				alias: updatedUser.alias,
				role: updatedUser.role,
				grade: updatedUser.grade,
				createdOn: updatedUser.createdOn,
			});
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	}
);

/**
 * Update user profile
 *
 * @access public
 * @returns {Object}
 */

router.patch(
	'/updateProfile',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		if (req.body.password.length >= 8) {
			const hashPassword = await bcrypt.hash(req.body.password, 10);
			req.user.password = hashPassword;
		}
		if (req.body.name.firstName != null) {
			req.user.name.firstName = req.body.name.firstName;
		}
		if (req.body.name.lastName != null) {
			req.user.name.lastName = req.body.name.lastName;
		}
		if (req.body.alias != null) {
			req.user.alias = req.body.alias;
		}
		if (req.body.grade != null) {
			req.user.grade = req.body.grade;
		}
		try {
			const updatedUser = await req.user.save();
			res.status(200).json({
				success: true,
				email: updatedUser.email,
				name: updatedUser.name,
				alias: updatedUser.alias,
				role: updatedUser.role,
				grade: updatedUser.grade,
			});
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	}
);

/**
 * Delete user
 *
 * @access private
 * @returns {Object}
 */
router.delete(
	'/delete',
	passport.authenticate('jwt', { session: false }),
	getUser,
	async (req, res) => {
		if (req.user.role !== userRole.ADMIN) {
			return res.status(403).send('Access denied!');
		}
		try {
			await res.User.remove();
			res.status(200).json({ message: 'User removed.' });
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	}
);

/**
 * Check if user exist
 *
 * @param {Object} req
 * @param {Object} res
 * @param {function} next
 * @returns {Object}
 */
async function checkUser(req, res, next) {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (user !== null) {
			return res.status(400).send('User already registered!');
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}

	next();
}

module.exports = router;
