/*  global describe, it */
const app = require('../../app')
const request = require('supertest')
const should = require('chai').should()

describe('Return list of all bookings', () => {
  it('GET /bookings Should successfully return a list of all bookings', (done) => {
    request(app)
      .get('/api/bookings')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${global.adminToken}`)
      .expect(200)
      .then(({ body: { results } }) => {
        results.length.should.equal(1)
        done()
      })
      .catch(done)
  })
})