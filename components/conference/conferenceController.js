const Conference = require('../../models/conference')
const error = require('../../middlewares/errorHandling/errorConstants')

const createConference = async (req, res) => {
  const { title, description, date } = req.body
  if (!title || !description || !date) {
    throw new Error(error.MISSING_PARAMETERS)
  }
  const conference = await new Conference({
    title,
    description,
    date,
  }).save()

  return res.status(200).send({
    results: conference,
  })
}

const deleteConference = async (req, res) => {
  const { conferenceId } = req.params

  await Conference.deleteOne({
    _id: conferenceId
  })

  return res.status(200).send({
    message: 'Successfully deleted conference',
  })
}

module.exports = {
  createConference,
  deleteConference,
}