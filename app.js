const express = require('express')
const routes = require('./src/routes')

app = express()

app.use(express.static('public'))
app.use(routes)

module.exports = app