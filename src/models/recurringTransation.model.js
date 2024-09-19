const mongoose = require('mongoose')
const { COLLECTION, DOCUMENT } = require('../helpers/constants')

const recurringTransactionSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: DOCUMENT.USER,
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: DOCUMENT.CATEGORY,
		},
		amount: {
			type: Number,
			required: true,
			min: 0,
			default: 0,
		},
		frequency: {
			type: String,
			enum: ['daily', 'weekly', 'monthly', 'yearly'],
			required: true,
		},
		start_date: {
			type: Date,
			required: true,
			default: Date.now,
		},
		end_date: {
			type: Date,
		},
		description: {
			type: String,
			default: '',
		},
		transaction_type: {
			type: String,
			enum: ['expense', 'income'],
			required: true,
			default: 'expense',
		},
	},
	{
		timestamps: true,
		collection: COLLECTION.RECURRING_TRANSACTION,
	}
)

module.exports = mongoose.model(
	DOCUMENT.RECURRING_TRANSACTION,
	recurringTransactionSchema
)
