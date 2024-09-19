const express = require('express')

const appRouter = express.Router()

const userRoutes = require('./user.route')
const authRoutes = require('./auth.route')
const accountRoutes = require('./account.route')
const transactionRoutes = require('./transaction.route')

//LATER
// appRouter.use('/users').all(userRoutes)

appRouter.use('/users', userRoutes)
appRouter.use('/auth', authRoutes)
appRouter.use('/accounts', accountRoutes)
appRouter.use('/transactions', transactionRoutes)

module.exports = appRouter
