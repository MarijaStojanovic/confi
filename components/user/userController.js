const { User } = require('../../models/user')
const { issueNewToken } = require('../../lib/jwtHandler')
const { compareSync } = require('bcrypt')
const error = require('../../middlewares/errorHandling/errorConstants')

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new Error(error.MISSING_PARAMETERS)
  }
  const user = await User
    .findOne(
      { email: email.toLowerCase() })
    .lean()
    .select('+password')

  if (!user) {
    throw new Error(error.NOT_FOUND)
  }
  if (!compareSync(password, user.password)) {
    throw new Error(error.CREDENTIALS_ERROR)
  }

  delete user.password
  return res.status(200).send({
    message: 'Successfully signed in',
    token: issueNewToken({
      _id: user._id,
    }),
    results: user,
  })
}
