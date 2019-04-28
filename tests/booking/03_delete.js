/*  global describe, it */
const app = require('../../app')
const request = require('supertest')
const should = require('chai').should()
const { addRandomBooking } = require('../helper/createBooking')

describe('Return list of all bookings', () => {
  it('DELETE /bookings/:bookingId Should successfully delete booking', (done) => {
    addRandomBooking()
      .then((booking) => {
        return request(app)
          .delete(`/api/bookings/${booking._id}`)
          .set('Accept', 'application/json')
          .expect(200)
          .then(({ body: { message } }) => {
            message.should.equal('Successfully deleted booking')
            done()
          })
      })
      .catch(done)
  })
})