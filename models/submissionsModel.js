const mongoose = require('mongoose')
const Schema = mongoose.Schema

const submissionsSchema = new Schema({
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		// required: true,
	},
	imgUrl: {
		type: String,
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	likes: {
		type: Number,
		default: 0,
	},
})

module.exports = mongoose.model('Submission', submissionsSchema)
