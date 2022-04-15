const { Router } = require('express')

const {upload} = require('../middlewares/upload')

//Meus Controllers
const UploadController = require('../controllers/UploadController')


const routes = Router()

routes.get('/test', (req, res) => {
  return res.status(200).send('Olá')
})

routes.post('/uploads', upload.single('file'), UploadController.uploadFile)

module.exports = routes