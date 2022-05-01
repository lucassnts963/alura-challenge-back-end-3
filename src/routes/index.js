const express = require('express')
const { Router } = require('express')

//Meus middlewares
const {upload} = require('../middlewares/upload')

//Meus Controllers
const UploadController = require('../controllers/UploadController')
const ImportController = require('../controllers/ImportController')

//My routes
const auth  = require('./authRoutes')
const users = require('./userRoutes')

const routes = Router()

//My middlewares
const AuthHandler = require('../services/AuthHandler')

routes.use(
  express.json(),
  express.urlencoded({ extended: true }),
  auth,
  users,
  )

routes.get('', AuthHandler.isLogged, ImportController.findAll)

routes.get('/about', (req, res) => {
  return res.render('about', { title: 'Sobre' })
})

routes.post('/uploads', upload.single('file'), UploadController.uploadFile)

module.exports = routes