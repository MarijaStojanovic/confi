/*  global describe, it */
const app = require('../../app')
const request = require('supertest')
const should = require('chai').should()
const { addRandomConference } = require('../helper/createConference')

describe('Delete conference', () => {
  it('DELETE /conferences/:conferenceId Should successfully delete conference', (done) => {
    addRandomConference()
      .then((conference) => {
        return request(app)
          .delete(`/api/conferences/${conference._id}`)
          .set('Accept', 'application/json')
          .expect(200)
          .then(({ body: { message } }) => {
            message.should.equal('Successfully deleted conference')
            done()
          })
      })
      .catch(done)
  })
})