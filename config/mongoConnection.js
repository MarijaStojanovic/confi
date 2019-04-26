const { name } = require('./../package.json')

const PROJECT_NAME = name
  .toLowerCase()

/**
 * Return mongodb connection
 * @returns {String}
 */
module.exports.connectionString = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return `mongodb://localhost:27017/${PROJECT_NAME}_prod`
    case 'test':
      return `mongodb://localhost:27017/${PROJECT_NAME}_test`
    default:
      return `mongodb://localhost:27017/${PROJECT_NAME}_dev`
  }
}
