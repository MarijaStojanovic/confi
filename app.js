const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const expressJwt = require('express-jwt')
const ErrorHandler = require('./middlewares/errorHandling/errorHandler')
const { connectionString } = require('./config/mongoConnection')

const port = process.env.PORT

const app = express()

// Application Routes
const UserRoutes = require('./components/user/userRouter'
)
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Create the database connection
/* eslint-disable no-console */
mongoose.connect(connectionString(), {
  reconnectTries: Number.MAX_VALUE,
  useCreateIndex: true,
  useNewUrlParser: true,
})

mongoose.connection.on('connected', () => {
  console.log(`Mongoose default connection open to ${connectionString()}`)
})

// CONNECTION EVENTS
// If the connection throws an error
mongoose.connection.on('error', (err) => {
  console.log(`Mongoose default connection error: ${err}`)
})

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected')
})

// When the connection is open
mongoose.connection.on('open', () => {
  console.log('Mongoose default connection is open')
})

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination')
    process.exit(0)
  })
})

app.use('/api', UserRoutes)

app.use(ErrorHandler())

app.listen(port)

module.exports = app
