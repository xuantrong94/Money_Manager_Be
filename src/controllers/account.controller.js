const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const Account = require('../models/account.model')
const APIFeatures = require('../utils/apiFeatures')

exports.setUser = catchAsync(async (req, res, next) => {
	if (!req.body.user) req.body.user = req.user._id
	next()
})

exports.createAccount = catchAsync(async (req, res, next) => {
	const account = await Account.create(req.body)
	res.status(201).json({
		status: 'success',
		data: account,
	})
})

exports.getAllAccounts = catchAsync(async (req, res, next) => {
	const filter = {}
	if (req.params.userId) {
		filter.user = req.params.userId
	}

	const features = new APIFeatures(Account.find(filter), req.query)
		.filter()
		.sort()
		.limitFields()
		.paginate()

	const accounts = await features.query

	res.status(200).json({
		status: 'success',
		results: accounts.length,
		data: {
			accounts,
		},
	})
})

exports.getAccount = catchAsync(async (req, res, next) => {
	const account = await Account.findById(req.params.id).populate({
		path: 'user',
		select: 'name email',
	})
	if (!account) {
		return next(new AppError('No account found with that ID', 404))
	}
	res.status(200).json({
		status: 'success',
		data: account,
	})
})
exports.updateAccount = catchAsync(async (req, res, next) => {
	const account = await Account.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
			runValidators: true,
		}
	)
	if (!account) {
		return next(new AppError('No account found with that ID', 404))
	}
	res.status(200).json({
		status: 'success',
		data: account,
	})
})
exports.deleteAccount = catchAsync(async (req, res, next) => {
	const account = await Account.findByIdAndDelete(req.params.id)
	if (!account) {
		return next(new AppError('No account found with that ID', 404))
	}
	res.status(204).json({
		status: 'success',
		data: null,
	})
})
