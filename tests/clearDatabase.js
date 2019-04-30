/*  global before, after */
const mongoose = require('mongoose')
const { User } = require('../models/user')
const { issueNewToken } = require('../lib/jwtHandler')

before((done) => {
  mongoose.connection.on('open', () => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.db.createCollection('users', () =>
        new User({
          email: 'test@test.com',
          password: 'test',
        }).save()
          .then((user) => {
            global.adminToken = issueNewToken({ _id: user._id })
            done()
          }))
    })
  })
})

after((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.disconnect()
    done()
  })
})
