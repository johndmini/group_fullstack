const express = require('express')
const submissionRouter = express.Router()
const Submission = require('../models/submissionsModel')

// Get all submissions
submissionRouter.get('/', (req, res, next) => {
	Submission.find((err, submissions) => {
		if (err) {
			res.status(500)
			return next(err)
		}
		return res.status(200).send(submissions)
	})
})

// Post One submission
submissionRouter.post('/', (req, res, next) => {
	const newSubmission = new Submission(req.body)
	newSubmission.save((err, submission) => {
		if (err) {
			res.status(500)
			return next(err)
		}
		return res.status(201).send(submission)
	})
})

// find a specific submission by its id
submissionRouter.get('/:submissionId', (req, res, next) => {
	Submission.find({ _id: req.params.submissionId }, (err, foundSubmission) => {
		if (err) {
			res.status(500)
			return next(err)
		}
		return res.status(201).send(foundSubmission)
	})
})

// Update submission
submissionRouter.put('/:submissionId', (req, res, next) => {
	Submission.findOneAndUpdate(
		{ _id: req.params.submissionId },
		req.body,
		{ new: true },
		(err, updatedSubmission) => {
			if (err) {
				res.status(500)
				return next(err)
			}
			return res.status(201).send(updatedSubmission)
		}
	)
})

// Delete a submission
submissionRouter.delete('/:submissionId', (req, res, next) => {
	Submission.findOneAndDelete(
		{ _id: req.params.submissionId },
		(err, deletedSubmission) => {
			if (err) {
				res.status(500)
				return next(err)
			}
			return res
				.status(200)
				.send(
					`Successfully deleted ${deletedSubmission.title} from the database`
				)
		}
	)
})

module.exports = submissionRouter
