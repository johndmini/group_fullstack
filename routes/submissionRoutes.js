const express = require('express');
const submissionRouter = express.Router();
const Submission = require('../models/submissionsModel');

// Get all submissions
submissionRouter.get('/', (req, res, next) => {
    Submission.find((err, submissions) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(submissions);
    })
})

// Post One submission
submissionRouter.post('/', (req, res, next) => {
    const newSubmission = new Submission(req.body);
    newSubmission.save((err, submission) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(201).send(submission);
    })
})

module.exports = submissionRouter;
