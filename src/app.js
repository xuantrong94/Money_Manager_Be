const express = require('express')
require('dotenv').config()
const connectDB = require('./configs/db.config')
const appRouter = require('./routes/index.route')
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/error.controller')
const { default: helmet } = require('helmet')
const morgan = require('morgan')
const compression = require('compression')
const cors = require('cors')
const app = express()

//* app middleware
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(compression())

//* security middleware
app.use(helmet())

//* cors

const corsOptions = {
	origin: 'http://localhost:5173',
	credentials: true,
	allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsOptions))

//* database
connectDB()

//* routes
app.use('/api', appRouter)

//* global error handlers
app.all('*', (req, res, next) => {
	next(
		new AppError(`Can't find ${req.originalUrl} on this server`, 404)
	)
})
app.use(globalErrorHandler)

module.exports = app
