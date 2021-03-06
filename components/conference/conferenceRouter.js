const express = require('express')
const { createConference, deleteConference } = require('./conferenceController')
const { catchAsyncError } = require('../../lib/functionErrorHandler')
const { authCheck } = require('../../middlewares/authCheck')

const router = express.Router()

router
  .post('/conferences', authCheck, catchAsyncError(createConference))
  .delete('/conferences/:conferenceId', authCheck, catchAsyncError(deleteConference))

module.exports = router
