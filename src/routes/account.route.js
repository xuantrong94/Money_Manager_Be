const express = require('express')
const accountController = require('../controllers/account.controller')
const checkRoleOrOwner = require('../middleware/checkRoleOrOwner')
const checkLogin = require('../middleware/checkLogin')

const router = express.Router({ mergeParams: true })

router
	.route('/')
	.post(
		checkLogin,
		accountController.setUser,
		accountController.createAccount
	)
	.get(accountController.getAllAccounts)

router
	.route('/:id')
	.delete(accountController.deleteAccount)
	.get(accountController.getAccount)
	.patch(accountController.updateAccount)

router.route('/:userId').get()

module.exports = router
