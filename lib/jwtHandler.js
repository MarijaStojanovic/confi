const { sign } = require('jsonwebtoken')

/**
 * Returns a jwt-signed token
 * @param {*} user
 */
module.exports.issueNewToken = user => sign(user, process.env.JWT_SECRET, { expiresIn: '12h' })
