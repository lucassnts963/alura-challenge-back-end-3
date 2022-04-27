const models = require('../models')
const Utils = require('../utils/Utils')

const ImportService = require('../services/ImportService')

class ImportController {
  static async findAll(req, res){
    const allImports = await ImportService.findAll(error => {
      if(error){
        return res.status(500).render('error', {title: 'Error', message: error}) 
      }
    })

    const imports = allImports.map((item, index) => {
      return {
        ...item,
        dateTransactions: Utils.formatDate(item.dateTransactions),
        createdAt: Utils.formatDate(item.createdAt, true),
      }
    })   
    return res.status(200).render('index', { title: 'Alura Challenge 3ª Edição', data: imports })
  }
}

module.exports = ImportController