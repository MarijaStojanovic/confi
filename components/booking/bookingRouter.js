const express = require('express')
const { makeBooking, listBookings } = require('./bookingController')
const { catchAsyncError } = require('../../lib/functionErrorHandler')

const router = express.Router()

router
  .post('/bookings', catchAsyncError(makeBooking))
  .get('/bookings', catchAsyncError(listBookings))

module.exports = router