const express = require('express')
const { makeBooking, listBookings, deleteBooking } = require('./bookingController')
const { catchAsyncError } = require('../../lib/functionErrorHandler')
const { authCheck } = require('../../middlewares/authCheck')

const router = express.Router()

router
  .post('/bookings', catchAsyncError(makeBooking))
  .get('/conferences/:conferenceId/bookings', authCheck, catchAsyncError(listBookings))
  .delete('/bookings/:bookingId', authCheck, catchAsyncError(deleteBooking))

module.exports = router