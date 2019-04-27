/*  global describe, it */
const app = require('../../app')
const request = require('supertest')
const should = require('chai').should()
const faker = require('faker')

describe('Sign in', () => {
  it('POST /signin Should successfully sign in user', (done) => {
    const body = {
      email: 'test@test.com',
      password: 'test',
    }
    request(app)
      .post('/api/signin')
      .set('Accept', 'application/json')
      .send(body)
      .expect(200)
      .then(({ body: { message, results } }) => {
        message.should.equal('Successfully signed in')
        results.email.should.equal(body.email)
        should.not.exist(results.password)
        done()
      })
      .catch(done)
  })

  it('POST /signin Should return missing parameters', (done) => {
    const body = {
      email: faker.internet.email(),
    }
    request(app)
      .post('/api/signin')
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

  it('POST /signin Should return an error', (done) => {
    const body = {
      email: faker.internet.email().toLowerCase(),
      password: faker.internet.password(),
    }
    request(app)
      .post('/api/signin')
      .set('Accept', 'application/json')
      .send(body)
      .expect(404)
      .then(({ body: { message } }) => {
        message.should.equal('Not Found')
        done()
      })
      .catch(done)
  })

  it('POST /signin Should return an error', (done) => {
    const body = {
      email: 'test@test.com',
      password: faker.internet.password(),
    }
    request(app)
      .post('/api/signin')
      .set('Accept', 'application/json')
      .send(body)
      .expect(401)
      .then(({ body: { message } }) => {
        message.should.equal('Wrong credentials')
        done()
      })
      .catch(done)
  })
})
