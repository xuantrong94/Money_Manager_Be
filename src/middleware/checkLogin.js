const jsonwebtoken = require('jsonwebtoken')

const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const {
	jwt: { key },
} = require('../configs/env.config')
const User = require('../models/user.model')

const checkLogin = catchAsync(async (req, res, next) => {
	if (!req.headers['authorization']) {
		throw new AppError('User is not login', 401)
	}
	const access_token = req.headers['authorization'].split(' ')[1]
	// Verify the token using JWT
	const decoded = jsonwebtoken.verify(access_token, key)

	if (!decoded) {
		throw new AppError('Authentication failed', 401)
	}

	if (decoded.exp < Date.now() / 1000) {
		throw new AppError('Token expired', 401)
	}

	const user = await User.findById(decoded.id)

	if (!user) {
		throw new AppError('User not found', 404)
	}
	req.user = user
	next()
})

module.exports = checkLogin
