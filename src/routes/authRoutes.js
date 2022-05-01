const { Router } = require('express')
const AuthHandler = require('../services/AuthHandler')

const routes = Router()

routes.get('/authenticate', (req, res) => { return res.status(200).render('signIn', { title: 'Sign In' }) })
routes.post('/authenticate', AuthHandler.signIn)
routes.get('/logout', AuthHandler.logout)

module.exports = routes