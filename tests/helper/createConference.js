const Conference = require('../../models/conference')
const faker = require('faker')

/**
 * Returns the mongodb saved conference
 * @param {String} title
 * @param {String} description
 * @param {Date} date
 * @returns {Promise}
 */
const addRandomConference = () => new Promise((resolve, reject) =>
  new Conference({
    title: faker.lorem.word(),
    description: faker.lorem.words(),
    date: faker.date.future(),
  }).save()
    .then(resolve)
    .catch(reject))

module.exports = {
  addRandomConference,
}
