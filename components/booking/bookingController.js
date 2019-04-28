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
  const bookings = await Booking.find({}).lean()
  return res.status(200).send({
    results: bookings,
  })
}

module.exports = {
  makeBooking,
  listBookings,
}