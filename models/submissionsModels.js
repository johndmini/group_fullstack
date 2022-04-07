const mongoose = require('mongoose')
const Schema = mongoose.Schema

const submissionsModelSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	email: {
		type: String,
		required: true,
	},
	image: {
		type: String,
	},
	likes: {
		type: Number,
		default: 0,
	},
})

module.exports = mongoose.model('Submission', submissionsModelSchema)
