const Utils = require('../utils/Utils')

class UploadController {
  static uploadFile(req, res){
    const { file } = req
    const {originalname, filename, path, size} = file
    const textToSend = `O arquivo ${originalname} de ${Utils.bytesToMegabytes(size)}MB foi recebido e salvo em ${path}.`
    Utils.csvToJson(path, separator = ',')
    return res.status(200).json({message: textToSend})
  }
}

module.exports = UploadController