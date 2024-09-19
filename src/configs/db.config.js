const mongoose = require('mongoose')
const {
  db: { uri, name },
} = require('./env.config')
const connectDB = async () => {
  try {
    await mongoose.connect(uri)
    console.log(`Connected to DB ${name} successfully`)
  } catch (error) {
    console.error(`Connect DB `, error)
    process.exit(1)
  }
}

module.exports = connectDB
