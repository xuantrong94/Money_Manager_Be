const mongoose = require('mongoose')
const { COLLECTION, DOCUMENT } = require('../helpers/constants')

const accountSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Account name is required'],
		},
		balance: {
			type: Number,
			required: true,
			default: 0,
		},
		type: {
			type: String,
			enum: ['cash', 'bank', 'digital_wallet', 'savings'],
			required: true,
			default: 'bank',
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: DOCUMENT.USER,
		},
	},
	{ timestamps: true, collection: COLLECTION.ACCOUNT }
)

accountSchema.pre('save', async function (next) {
	const user = this.user
	await mongoose.model(DOCUMENT.USER).findByIdAndUpdate(user, {
		$push: { accounts: this._id },
	})
	next()
})

module.exports = mongoose.model(DOCUMENT.ACCOUNT, accountSchema)
