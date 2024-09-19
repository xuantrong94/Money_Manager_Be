// validation/user.dto.js

const Joi = require('joi')

const createUserDTO = Joi.object({
	username: Joi.string().min(3).max(255).required().messages({
		'string.base': `"name" should be a type of 'text'`,
		'string.empty': `"name" cannot be an empty field`,
		'string.min': `"name" should have a minimum length of {#limit}`,
		'string.max': `"name" should have a maximum length of {#limit}`,
		'any.required': `"name" is a required field`,
	}),
	email: Joi.string().email().min(5).max(255).required().messages({
		'string.base': `"email" should be a type of 'text'`,
		'string.empty': `"email" cannot be an empty field`,
		'string.min': `"email" should have a minimum length of {#limit}`,
		'string.max': `"email" should have a maximum length of {#limit}`,
		'string.email': `"email" must be a valid email`,
		'any.required': `"email" is a required field`,
	}),
	password: Joi.string().min(6).max(1024).required().messages({
		'string.base': `"password" should be a type of 'text'`,
		'string.empty': `"password" cannot be an empty field`,
		'string.min': `"password" should have a minimum length of {#limit}`,
		'string.max': `"password" should have a maximum length of {#limit}`,
		'any.required': `"password" is a required field`,
	}),
})

const updateUserDTO = Joi.object({
	email: Joi.string().email().min(5).max(255),
	password: Joi.string().min(6).max(1024),
})

module.exports = {
	createUserDTO,
	updateUserDTO,
}
