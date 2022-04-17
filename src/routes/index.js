const { Router } = require('express')

const {upload} = require('../middlewares/upload')

//Meus Controllers
const UploadController = require('../controllers/UploadController')
const ImportController = require('../controllers/ImportController')


const routes = Router()

//Rota de teste
routes.get('/test', (req, res) => {
  return res.status(200).send('Olá')
})

routes.get('', ImportController.findAll)

routes.get('/about', (req, res) => {
  return res.render('about', { title: 'Sobre' })
})

routes.post('/uploads', upload.single('file'), UploadController.uploadFile)

module.exports = routes