const express = require('express')
const routes = require('./src/routes')
const expressLayouts = require('express-ejs-layouts')

app = express()

// static files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

// Set Templating engine
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('views', './src/views')

// My routes
app.use(routes)

module.exports = app