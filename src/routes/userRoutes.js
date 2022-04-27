const { Router } = require('express')

const UserController = require('../controllers/UserController')

const routes = Router()

//routes.get('/users', UserController.findAll)
routes.get('/users/novo', (req, res) => {
  return res.render('cadastro', { title: 'Novo Usuário' })
})
//routes.get('/users/:id', UserController.findOneById)
routes.post('/users/novo', UserController.create)
//routes.put('/users/:id', UserController.update)
//routes.delete('/users/:id', UserController.delete)
//routes.get('/users/:id/login', UserController.signIn)

module.exports = routes