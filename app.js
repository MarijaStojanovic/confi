const express = require('express')

const port = process.env.PORT

const app = express()

app.listen(port)

module.exports = app
