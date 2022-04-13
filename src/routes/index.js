const { Router } = require('express')

const routes = Router()

routes.get('/test', (req, res) => {
  return res.status(200).send('Olá')
})

module.exports = routes