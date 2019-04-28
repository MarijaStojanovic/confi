const Booking = require('../../models/booking')
const faker = require('faker')

/**
 * Returns the mongodb saved booking
 * @param {String} firstName 
 * @param {String} lastName 
 * @param {String} email 
 * @param {String} phone 
 * @returns {Promise}
 */
const addRandomBooking = () => new Promise((resolve, reject) => {
  return new Booking({
    firstName: faker.name.findName(),
    lastName: faker.name.findName(),
    email: faker.internet.email().toLowerCase(),
    phone: faker.random.number(),
  }).save()
    .then(resolve)
    .catch(reject)
})

/**
 * Returns MongoDB saved bookings
 * @param {Number} numberOfBookings
 */
const addManyBookings = (numberOfBookings = Math.floor(Math.random() * 10)) => new Promise((resolve, reject) => {
  const query = []
  for (let i = 0; i < numberOfBookings; i += 1) {
    query.push({
      firstName: faker.name.findName(),
      lastName: faker.name.findName(),
      email: faker.internet.email().toLowerCase(),
      phone: faker.random.number(),
    })
  }
  Booking
    .insertMany(query)
    .then(resolve)
    .catch(reject)
})

module.exports = {
  addRandomBooking,
  addManyBookings,
}
