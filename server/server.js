const express = require('express')
const mongoose = require('mongoose')
const { mongo_URI } = require('./config/dev.js')
const bodyParserMiddleware = require('./middleware/bodyParserMiddleware.js')
const authRoutes = require('./routes/authRoutes.js')
const errorHandler = require('./middleware/errorHandlerMiddleware.js')
require('dotenv').config()

// Initialize express
const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use(errorHandler)

// Connect to MongoDB
mongoose.connect(mongo_URI)
  .then(() => {
    console.log("Connected to mongodb")
  })
  .catch((err) => {
    console.log("Error connecting to db", err)
  })

// Routes
app.use('/api/auth', authRoutes)

// Start the server
app.listen(PORT, (error) => {
  if (error) {
    console.log("Error connecting to the server")
  }
  console.log(`Connected to port ${PORT}`)
})

