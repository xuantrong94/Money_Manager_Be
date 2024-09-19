const AppError = require('../utils/appError')

const sendErrorDev = (err, res) => {
	console.log('::: ~ sendErrorDev ~ err:', err)
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
		name: err.name,
		stack: err.stack,
	})
}

const sendErrorProd = (err, res) => {
	console.log('::: ~ sendErrorProd ~ err:', err)
	res.status(500).json({
		status: err.status,
		message: 'Something went wrong, please try again later.',
		name: err.name,
	})
}

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500
	err.name = err.name
	err.status = err.status || 'error'
	if (process.env.NODE_ENV !== 'production') {
		sendErrorDev(err, res)
	} else {
		sendErrorProd(err, res)
	}
}
