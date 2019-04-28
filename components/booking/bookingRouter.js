const express = require('express')
const { makeBooking, listBookings, deleteBooking } = require('./bookingController')
const { catchAsyncError } = require('../../lib/functionErrorHandler')

const router = express.Router()

router
  .post('/bookings', catchAsyncError(makeBooking))
  .get('/bookings', catchAsyncError(listBookings))
  .delete('/bookings/:bookingId', catchAsyncError(deleteBooking))

module.exports = router