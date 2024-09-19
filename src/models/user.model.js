const mongoose = require('mongoose')
const { COLLECTION, DOCUMENT } = require('../helpers/constants')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			minlength: 3,
			maxlength: 255,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			minlength: 5,
			maxlength: 255,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
			maxlength: 1024,
			select: false, // hide password field in response
		},
		role: {
			type: String,
			enum: ['user', 'admin'],
			default: 'user',
		},
		active: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION.USER,
	}
)

// hash password before save
userSchema.pre('save', async function (next) {
	const salt = 10
	this.password = await bcrypt.hash(this.password, salt)

	next()
})

// methods

userSchema.methods.comparePassword = async function (
	candidatePassword
) {
	return await bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model(DOCUMENT.USER, userSchema)
