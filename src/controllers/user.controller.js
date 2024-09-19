const express = require('express')
const catchAsync = require('../utils/catchAsync')
const User = require('../models/user.model')
const { sendToken } = require('../utils/token')
const APIFeatures = require('../utils/apiFeatures')
const jwt = require('jsonwebtoken')
const AppError = require('../utils/appError')

exports.register = catchAsync(async (req, res) => {
	if (!req.body.username || !req.body.email || !req.body.password) {
		throw new AppError(
			'Please provide username, email and password!',
			400
		)
	}
	if (await User.findOne({ email: req.body.email })) {
		throw new AppError('Email already exists', 400)
	}
	const newUser = {
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
	}
	const user = await User.create(newUser)
	sendToken(user, 201, res)
})

exports.login = catchAsync(async (req, res) => {
	const { email, password } = req.body
	if (!email || !password) {
		throw new AppError('Please provide email and password!', 400)
	}
	const user = await User.findOne({ email }).select('+password')
	if (
		!user ||
		!(await user.comparePassword(password, user.password))
	) {
		throw new AppError('Incorrect email or password', 401)
	}
	sendToken(user, 200, res)
})

exports.deleteUser = catchAsync(async (req, res) => {
	const user = await User.findByIdAndDelete(req.params.id)
	if (!user) {
		throw new AppError('User not found', 404)
	}
	return res.status(200).json({
		status: 200,
		data: null,
		message: 'User deleted successfully',
	})
})

exports.getAllUsers = catchAsync(async (req, res) => {
	// Apply filters, sorting, field limiting, and pagination using APIFeatures
	const features = new APIFeatures(User.find(), req.query)
		.filter()
		.sort()
		.limitFields()
		.paginate()

	// Execute the query to get users
	const users = await features.query

	// Send the response
	res.status(200).json({
		status: 'success',
		results: users.length,
		data: users,
		message: 'Users fetched successfully',
	})
})

exports.getUser = catchAsync(async (req, res) => {
	const user = await User.findById(req.params.id)
	if (!user) {
		throw new AppError('User not found', 404)
	}
	res.status(200).json({
		status: 'success',
		data: user,
	})
})

exports.updateUser = catchAsync(async (req, res) => {
	const user = await User.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	})
	if (!user) {
		throw new AppError('User not found', 404)
	}
	res.status(200).json({
		status: 'success',
		data: user,
	})
})
