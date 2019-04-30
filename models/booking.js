const { model, Schema } = require('mongoose')

const BookingSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: { type: String, required: true },
  conference: {
    type: Schema.Types.ObjectId,
    ref: 'Conference',
  },
  code: String,
}, { timestamps: true })

module.exports = model('Booking', BookingSchema)
