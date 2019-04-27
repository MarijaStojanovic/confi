const express = require('express')
const { signIn } = require('./userController')
const { catchAsyncError } = require('../../lib/functionErrorHandler')

const router = express.Router()

router
  .post('/signin', catchAsyncError(signIn))

module.exports = router
