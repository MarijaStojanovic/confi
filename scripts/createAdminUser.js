const mongoose = require('mongoose')
const { User } = require('../models/user')
const { connectionString } = require('../config/mongoConnection')

mongoose.Promise = global.Promise

// Add admin user to the database
/* eslint-disable no-console */
const password = 'admin'
const email = 'admin@example.com'

const admin = new User({
  email,
  password,
})

admin.save()
  .then(() => {
    console.log('Successfully added admin')
    process.exit()
  })
  .catch((error) => {
    console.log('Error', error)
    process.exit()
  })


// Create the database connection
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
/* eslint-enable no-console */
