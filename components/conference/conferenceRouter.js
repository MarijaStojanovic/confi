const express = require('express')
const { createConference } = require('./conferenceController')
const { catchAsyncError } = require('../../lib/functionErrorHandler')

const router = express.Router()

router
  .post('/conferences', catchAsyncError(createConference))

module.exports = router