/*  global before, after */
const mongoose = require('mongoose')
const { User } = require('../models/user')

before((done) => {
  mongoose.connection.on('open', () => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.db.createCollection('users', () => {
        return new User({
          email: 'test@test.com',
          password: 'test',
        }).save()
          .then(() => {
            done()
          })
      })
    })
  })
})

after((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.disconnect()
    done()
  })
})
