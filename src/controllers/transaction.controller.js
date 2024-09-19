const Transaction = require('../models/transaction.model')
const {
	createOne,
	getAll,
	getOne,
	updateOne,
	deleteOne,
} = require('./handleFactory')

exports.createTransaction = createOne(Transaction)
exports.getAllTransactions = getAll(Transaction)
exports.getTransaction = getOne(Transaction, {
	path: 'transactions',
	select: '-__v',
})
exports.updateTransaction = updateOne(Transaction)
exports.deleteTransaction = deleteOne(Transaction)
