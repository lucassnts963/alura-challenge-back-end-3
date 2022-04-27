const FileHandler = require('../services/FileHandler')

class UploadController {
  static async uploadFile(req, res){
    //TODO: implementar função de selecionar o separador do csv
    const { file } = req

    const fileHandler = new FileHandler(file)

    fileHandler.writeDataToDatabase(error => {
      if(error){
        return res.status(500).render('error', { title: 'Error', message: error.message })
      }
      
      return res.status(200).render('alert', { title: 'Aviso', message: 'Importação realizada com sucesso!!!' })
    })
    
    //TODO: Criar lógica para apagar arquivo do upload
  }
}

module.exports = UploadController