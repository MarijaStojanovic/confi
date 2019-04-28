/*  global describe, it */
const app = require('../../app')
const request = require('supertest')
const should = require('chai').should()
const faker = require('faker')

describe('Make a new booking', () => {
  it('POST /bookings Should successfully make a new booking', (done) => {
    const body = {
      firstName: faker.name.findName(),
      lastName: faker.name.findName(),
      email: faker.internet.email().toLowerCase(),
      phone: faker.random.number(),
    }
    request(app)
      .post('/api/bookings')
      .set('Accept', 'application/json')
      .send(body)
      .expect(200)
      .then(({ body: { results } }) => {
        results.firstName.should.equal(body.firstName)
        results.lastName.should.equal(body.lastName)
        results.email.should.equal(body.email)
        results.phone.should.equal(body.phone.toString())
        done()
      })
      .catch(done)
  })

  it('POST /conference Should return missing parameters', (done) => {
    const body = {
      firstName: faker.name.findName(),
      lastName: faker.name.findName(),
    }
    request(app)
      .post('/api/bookings')
      .set('Accept', 'application/json')
      .send(body)
      .expect(400)
      .then(({ body: { message, status, errorCode } }) => {
        message.should.equal('Missing parameters')
        status.should.equal(400)
        errorCode.should.equal(2)
        done()
      })
      .catch(done)
  })
})