const { Router } = require('express')

const UserController = require('../controllers/UserController')

const AuthHandler = require('../services/AuthHandler')

const routes = Router()

routes.get('/users', AuthHandler.isLogged, UserController.findAll)
routes.get('/users/novo', (req, res) => {
  return res.render('cadastro', { title: 'Novo Usuário' })
})
routes.post('/users/novo', UserController.create)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.delete)

module.exports = routes