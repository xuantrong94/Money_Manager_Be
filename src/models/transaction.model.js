const mongoose = require('mongoose')
const { COLLECTION, DOCUMENT } = require('../helpers/constants')

const transactionSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		balance: {
			type: Number,
			required: true,
			default: 0,
		},
		type: {
			type: String,
			enum: ['cash', 'bank', 'digital_wallet', 'savings'],
			default: 'cash',
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: DOCUMENT.USER,
		},
	},
	{ timestamps: true, collection: COLLECTION.TRANSACTION }
)

module.exports = mongoose.model(DOCUMENT.TRANSACTION, transactionSchema)
