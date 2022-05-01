const session = require('express-session')

module.exports = session({
  secret: 'Keep it secret',
  name: 'uniqueSessionID',
  saveUninitialized: false,
})