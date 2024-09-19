const express = require('express')
const transactionController = require('../controllers/transaction.controller')
const checkLogin = require('../middleware/checkLogin')

const router = express.Router({mergeParams: true})

router.route('/').post(checkLogin, transactionController.createTransaction)

module.exports = router