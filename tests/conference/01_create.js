/*  global describe, it */
const app = require('../../app')
const request = require('supertest')
const should = require('chai').should()
const faker = require('faker')

describe('Create new conference', () => {
  it('POST /conference Should successfully create a new conference', (done) => {
    const body = {
      title: 'Conference title',
      description: 'Conference description',
      date: '05-20-2019',
    }
    request(app)
      .post('/api/conferences')
      .set('Accept', 'application/json')
      .send(body)
      .expect(200)
      .then(({ body: { results } }) => {
        results.title.should.equal(body.title)
        done()
      })
      .catch(done)
  })

  it('POST /conference Should return missing parameters', (done) => {
    const body = {
      title: faker.lorem.word(),
    }
    request(app)
      .post('/api/conferences')
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