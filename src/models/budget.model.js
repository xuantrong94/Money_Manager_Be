const mongoose = require('mongoose')
const { COLLECTION, DOCUMENT } = require('../helpers/constants')

const budgetSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		amount: {
			type: Number,
			required: true,
			default: 0,
		},
		type: {
			type: String,
      enum: ['long, short', 'medium'],
      default: 'short'
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: DOCUMENT.USER,
		},
		start_date: {
			type: Date,
      required: true,
      default: Date.now,
		},
		end_date: {
			type: Date,
			required: true,
		},
	},
	{ timestamps: true, collection: COLLECTION.BUDGET }
)

module.exports = mongoose.model(DOCUMENT.BUDGET, budgetSchema)
