const { Router } = require('express')

const {upload} = require('../middlewares/upload')

//Meus Controllers
const UploadController = require('../controllers/UploadController')
const ImportController = require('../controllers/ImportController')

//My routes
const users = require('./userRoutes')
const express = require('express')

const routes = Router()

routes.use(
  express.json(),
  express.urlencoded({ extended: true }),
  users,
  )

routes.get('', ImportController.findAll)

routes.get('/about', (req, res) => {
  return res.render('about', { title: 'Sobre' })
})

routes.get('/user', (req, res) => {
  return res.render('cadastro', { title: 'Novo Usuário' })
})

routes.post('/uploads', upload.single('file'), UploadController.uploadFile)

module.exports = routes