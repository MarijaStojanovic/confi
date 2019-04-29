/*  global describe, it */
const app = require('../../app')
const request = require('supertest')
const { addRandomBooking } = require('../helper/createBooking')
const should = require('chai').should()

describe('Return list of all bookings', () => {
  it('GET /conferences/:conferenceId/bookings Should successfully return a list of all bookings', (done) => {
    addRandomBooking()
      .then((booking) => {
        return request(app)
          .get(`/api/conferences/${booking.conference}/bookings`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${global.adminToken}`)
          .expect(200)
          .then(({ body: { results } }) => {
            results.length.should.equal(1)
            done()
          })
      })
      .catch(done)
  })
})