const express = require('express')
const { makeBooking } = require('./bookingController')
const { catchAsyncError } = require('../../lib/functionErrorHandler')

const router = express.Router()

router
  .post('/bookings', catchAsyncError(makeBooking))

module.exports = router