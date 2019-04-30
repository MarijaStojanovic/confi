const { model, Schema } = require('mongoose')
const { hashSync } = require('bcrypt')
const { emailRegExp } = require('../lib/misc')

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    match: [emailRegExp, 'Invalid email'],
    required: 'Please enter an email address',
  },
  password: { type: String, required: true, select: false },
}, { timestamps: true })

// Can not use arrow function, because this.password needs to work
// eslint-disable-next-line func-names
UserSchema.pre('save', function (next) {
  this.password = hashSync(this.password, 10)
  next()
})

module.exports = {
  User: model('User', UserSchema),
}
