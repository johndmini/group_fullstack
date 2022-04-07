const express = require('express')
const userRouter = express.Router()
const User = require('../models/usersModel')

// Get all users
userRouter.get('/', (req, res, next) => {
	User.find((err, users) => {
		if (err) {
			res.status(500)
			return next(err)
		}
		return res.status(200).send(users)
	})
})

// Post One user
userRouter.post('/', (req, res, next) => {
	const newUser = new User(req.body)
	newUser.save((err, user) => {
		if (err) {
			res.status(500)
			return next(err)
		}
		return res.status(201).send(user)
	})
})

// find a specific user
userRouter.get('/:userId', (req, res, next) => {
	User.find({ _id: req.params.userId }, (err, foundUser) => {
		if (err) {
			res.status(500)
			return next(err)
		}
		return res.status(201).send(foundUser)
	})
})

// get user(s) by search term
userRouter.get('/search', (req, res, next) => {
	// search term
	const { user } = req.query
	// creates a regular expression out of the string "user"
	const pattern = new RegExp(user) // -- /user/
	//$options: 'i'  Case insensitive -lower or uppercase
	User.find({ name: { $regex: pattern, $options: 'i' } }, (err, users) => {
		if (err) {
			res.status(500)
			return next(err)
		}
		return res.status(200).send(users)
	})
})

// update user
userRouter.put('/:userId', (req, res, next) => {
	User.findOneAndUpdate(
		{ _id: req.params.userId },
		req.body,
		{ new: true },
		(err, updatedUser) => {
			if (err) {
				res.status(500)
				return next(err)
			}
			return res.status(201).send(updatedUser)
		}
	)
})

// DELETE user
userRouter.delete('/:userId', (req, res, next) => {
	User.findOneAndDelete({ _id: req.params.userId }, (err, deletedUser) => {
		if (err) {
			res.status(500)
			return next(err)
		}
		return res
			.status(200)
			.send(`Successfully deleted ${deletedUser.email} from the database`)
	})
})

module.exports = userRouter
