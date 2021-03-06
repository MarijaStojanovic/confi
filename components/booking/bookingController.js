const Booking = require('../../models/booking')
const error = require('../../middlewares/errorHandling/errorConstants')
const { customShortId } = require('../../lib/misc')
const mailgun = require('mailgun-js')({ apiKey: process.env.API_KEY, domain: process.env.DOMAIN })

const makeBooking = async (req, res) => {
  const { firstName, lastName, email, phone } = req.body
  const { conferenceId } = req.params

  if (!firstName || !lastName || !email || !phone) {
    throw new Error(error.MISSING_PARAMETERS)
  }
  const code = customShortId()

  const booking = await new Booking({
    firstName,
    lastName,
    email,
    phone,
    conference: conferenceId,
    code,
  }).save()

  data = {
    from: 'marija.stojanovic14@gmail.com',
    to: booking.email,
    subject: 'Confi confirmation code',
    text: `Hello ${booking.firstName},

    This is your code for entrance to conference: ${code}
    
    Best regards,`
  }
  mailgun.messages().send(data, (err, body) => {
    if (err) {
      console.log('err', err)
    }
  })
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