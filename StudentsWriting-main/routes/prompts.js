const express = require('express');
const router = express.Router();
const Prompt = require('../models/prompt');
const Answer = require('../models/answer');
const passport = require('passport');
const userRole = require('../constants/userRole');

/**
 * Get all prompts
 * @access public
 */
router.get('/', async (req, res) => {
	try {
		const prompts = await Prompt.find(
			{},
			{ posts: 0, content: 0 },
			{ sort: { createdOn: -1 } }
		);
		res.status(200).json(prompts);
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

/**
 * Get one specific prompts
 * @access public
 */
router.get('/:id', async (req, res) => {
	try {
		const prompt = await Prompt.findById(req.params.id).populate({
			path: 'posts',
			model: 'Answer',
			populate: {
				path: 'author',
				model: 'User',
				select: { email: 1, alias: 1 }, // Show only email and alias
			},
		});
		res.status(200).json(prompt);
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

/**
 * Create a new prompt
 * @access private
 */
router.post(
	'/create',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		if (req.user.role !== userRole.ADMIN) {
			return res.status(401).send('Access denied!');
		}
		try {
			const tempPrompt = new Prompt({
				title: req.body.title,
				description: req.body.description,
				structure: req.body.structure,
				content: req.body.content,
				type: req.body.type,
				grade: req.body.grade,
			});
			const newPrompt = await tempPrompt.save();
			res.status(200).json(newPrompt);
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	}
);

/**
 * Edit prompt
 * @access private
 */
router.patch(
	'/:id/edit',
	passport.authenticate('jwt', { session: false }),
	getPrompt,
	async (req, res) => {
		if (req.user.role !== userRole.ADMIN) {
			return res.status(401).send('Access denied!');
		}
		if (req.body.title != null) {
			res.Prompt.title = req.body.title;
		}
		if (req.body.description != null) {
			res.Prompt.description = req.body.description;
		}
		if (req.body.structure != null) {
			res.Prompt.structure = req.body.structure;
		}
		if (req.body.content != null) {
			res.Prompt.content = req.body.content;
		}
		if (req.body.type != null) {
			res.Prompt.type = req.body.type;
		}
		if (req.body.grade != null) {
			res.Prompt.grade = req.body.grade;
		}
		try {
			const updatedPrompt = await res.Prompt.save();
			res.status(200).json(updatedPrompt);
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	}
);

/**
 * Delete prompt
 * @access private
 */
router.delete(
	'/:id/delete',
	passport.authenticate('jwt', { session: false }),
	getPrompt,
	async (req, res) => {
		if (req.user.role !== userRole.ADMIN) {
			return res.status(401).send('Access denied!');
		}
		try {
			await res.Prompt.remove();
			res.status(200).json({ message: 'Prompt removed.' });
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	}
);

/**
 * Post answer
 * @access private
 */
router.patch(
	'/:id/post',
	passport.authenticate('jwt', { session: false }),
	getPrompt,
	async (req, res) => {
		const tempAnswer = new Answer({
			author: req.user._id,
			text: req.body.text,
		});

		try {
			const newAnswer = await tempAnswer.save();
			const tempPosts = [...res.Prompt.posts, newAnswer._id];
			res.Prompt.posts = tempPosts;
			const tempPrompt = await res.Prompt.save();

			const updatedPrompt = await tempPrompt.populate({
				path: 'posts',
				model: 'Answer',
				populate: {
					path: 'author',
					model: 'User',
					select: { email: 1, alias: 1 },
				},
			});

			res.status(200).json(updatedPrompt);
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	}
);

/**
 * Edit answer
 * @access private
 */
router.patch(
	'/edit/:pid',
	passport.authenticate('jwt', { session: false }),
	getAnswer,
	async (req, res) => {
		if (!res.Answer.author.equals(req.user._id)) {
			return res
				.status(403)
				.json({ message: 'Cannot edit answer of another user.' });
		}

		if (req.body.text != null) {
			res.Answer.text = req.body.text;
		}

		res.Answer.updatedOn = Date.now();

		try {
			const updatedAnswer = await res.Answer.save();
			res.status(200).json(updatedAnswer);
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	}
);

/**
 * Delete answer
 * @access private
 */
router.patch(
	'/:id/delete/:pid',
	passport.authenticate('jwt', { session: false }),
	getPrompt,
	getAnswer,
	async (req, res) => {
		if (!res.Answer.author.equals(req.user._id)) {
			return res
				.status(403)
				.json({ message: 'Cannot delete answer of another user.' });
		}

		const filteredPost = res.Prompt.posts.filter((post) => {
			return post._id != req.params.pid;
		});

		res.Prompt.posts = filteredPost;

		try {
			const updatedPrompt = await res.Prompt.save();
			await res.Answer.remove();
			res.status(200).json(updatedPrompt);
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	}
);

/**
 * Get a particular prompt middleware
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function getPrompt(req, res, next) {
	let existingPrompt;
	try {
		existingPrompt = await Prompt.findById(req.params.id);
		if (existingPrompt == null) {
			return res.status(404).json({ message: 'Cannot find prompt!' });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}

	res.Prompt = existingPrompt;
	next();
}

async function getAnswer(req, res, next) {
	let existingAnswer;
	try {
		existingAnswer = await Answer.findById(req.params.pid);
		if (existingAnswer == null) {
			return res.status(404).json({ message: 'Cannot find answer!' });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}

	res.Answer = existingAnswer;
	next();
}

module.exports = router;
