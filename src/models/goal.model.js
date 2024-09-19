const mongoose = require('mongoose')
const { COLLECTION, DOCUMENT } = require('../helpers/constants')

const goalSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		target_amount: {
			type: Number,
			required: true,
			min: 0,
			default: 0,
		},
		current_amount: {
			type: Number,
			required: true,
			min: 0,
			default: 0,
		},
		target_day: {
			type: Date,
			required: true,
			default: Date.now,
		},
		status: {
			type: String,
			enum: ['active', 'completed', 'cancelled'],
			required: true,
			default: 'active',
		},
	},
	{
		timestamps: true,
		collection: COLLECTION.GOAL,
	}
)

module.exports = mongoose.model(DOCUMENT.GOAL, goalSchema)
