const { model, Schema } = require('mongoose')

const ConferenceSchema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: String,
}, { timestamps: true })

module.exports = model('Conference', ConferenceSchema)