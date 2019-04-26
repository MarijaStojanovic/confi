const { model, Schema } = require('mongoose')
const { hashSync } = require('bcrypt')

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true, select: false },
}, { timestamps: true })

UserSchema.pre('save', function (next) {
  this.password = hashSync(this.password, 10)
  next()
})

module.exports = {
  User: model('User', UserSchema),
}