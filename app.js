const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const expressJwt = require('express-jwt')
const ErrorHandler = require('./middlewares/errorHandling/errorHandler')
const { connectionString } = require('./config/mongoConnection')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

const port = process.env.PORT || 8010

const app = express()

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Application Routes
const UserRoutes = require('./components/user/userRouter')
const ConferenceRoutes = require('./components/conference/conferenceRouter')
const BookingRoutes = require('./components/booking/bookingRouter')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Whitelisted routes
app.use(expressJwt({ secret: process.env.JWT_SECRET }).unless({
  path: [
    '/api/signin',
    { url: /\/api\/conferences\/.+\/bookings/, methods: ['POST'] },
  ],
}))

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
app.use('/api', ConferenceRoutes)
app.use('/api', BookingRoutes)

app.use(ErrorHandler())

app.listen(port)

module.exports = app
