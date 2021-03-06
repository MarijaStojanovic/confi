/*  global describe, it */
const app = require('../../app')
const request = require('supertest')
const should = require('chai').should()
const { addRandomBooking } = require('../helper/createBooking')

describe('Delete booking', () => {
  it('DELETE /bookings/:bookingId Should successfully delete booking', (done) => {
    addRandomBooking()
      .then(booking =>
        request(app)
          .delete(`/api/bookings/${booking._id}`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${global.adminToken}`)
          .expect(200)
          .then(({ body: { message } }) => {
            message.should.equal('Successfully deleted booking')
            done()
          }))
      .catch(done)
  })
})
