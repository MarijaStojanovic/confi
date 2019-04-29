const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

/**
 * Return custom short ID with 6 digits
 * @returns {string}
 */
const customShortId = (idLength = 6) => {
  const numbers = '0123456789'
  let data = ''
  for (let i = 0; i < idLength; i += 1) {
    data += numbers.charAt(Math.floor(Math.random() * numbers.length))
  }
  return data
}

module.exports = {
  emailRegExp,
  customShortId,
}