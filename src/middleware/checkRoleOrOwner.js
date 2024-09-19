const User = require('../models/user.model')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

const checkRoleOrOwner = (permittedRoles, Resource) => {
	return catchAsync(async (req, res, next) => {
		const user = User.findById(req.params.userId) 

		if (user.role === 'admin') {
			next()
		}

		if (!permittedRoles.includes(user.role)) {
			throw new AppError(
				'You do not have permission to perform this action',
				403
			)
		}

		const owner = Resource.findOne(req.params).select('user')
		if (!owner || owner.toString() !== user._id.toString()) {
			throw new AppError(
				'You do not have permission to perform this action',
				403
			)
		}
		next()
	})
}

module.exports = checkRoleOrOwner
