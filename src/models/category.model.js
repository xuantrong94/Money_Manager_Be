const mongoose = require('mongoose')
const { COLLECTION, DOCUMENT } = require('../helpers/constants')

const categorySchema = mongoose.Schema(
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
		categories: {
			type: String,
			ref: mongoose.Schema.Types.ObjectId,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: DOCUMENT.USER,
		},
		start_date: {
			type: Date,
			required: true,
		},
		end_date: {
			type: Date,
			required: true,
		},
	},
	{ timestamps: true, collection: COLLECTION.BUDGET }
)

module.exports = mongoose.model(DOCUMENT.BUDGET, categorySchema)
