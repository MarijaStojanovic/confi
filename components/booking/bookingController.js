const Booking = require('../../models/booking')
const error = require('../../middlewares/errorHandling/errorConstants')

const makeBooking = async (req, res) => {
  const { firstName, lastName, email, phone } = req.body
  if (!firstName || !lastName || !email || !phone) {
    throw new Error(error.MISSING_PARAMETERS)
  }
  const booking = await new Booking({
    firstName,
    lastName,
    email,
    phone,
  }).save()

  return res.status(200).send({
    results: booking,
  })
}

const listBookings = async (req, res) => {
  const { conferenceId } = req.params

  const bookings = await Booking.find({ conference: conferenceId }).lean()
  return res.status(200).send({
    results: bookings,
  })
}

const deleteBooking = async (req, res) => {
  const { bookingId } = req.params

  await Booking.deleteOne({ _id: bookingId })

  return res.status(200).send({
    message: 'Successfully deleted booking',
  })
}

module.exports = {
  makeBooking,
  listBookings,
  deleteBooking,
}