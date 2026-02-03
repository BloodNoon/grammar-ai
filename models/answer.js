const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	postedOn: {
		type: Date,
		required: true,
		default: Date.now,
	},
	updatedOn: {
		type: Date,
		required: true,
		default: Date.now,
	},
	text: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Answer', answerSchema);
