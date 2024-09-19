const express = require('express')
const userController = require('../controllers/user.controller')
const checkLogin = require('../middleware/checkLogin')
const accountRouter = require('./account.route')

const router = express.Router()

router.use('/:userId/accounts', accountRouter)

router
	.route('/')
	.post(userController.register)
	.get(userController.getAllUsers)

router
	.route('/:id')
	.delete(userController.deleteUser)
	.get(userController.getUser)
	.patch(userController.updateUser)

module.exports = router
