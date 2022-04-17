const models = require('../models')
const Utils = require('../utils/Utils')

class ImportController {
  static findAll(req, res, next){
    models.Imports.findAll()
      .then((itens) => {
        const imports = []
        for (let item of itens){
          imports.push(
            {
              ...item,
              dateTransactions: Utils.formatDate(item.dateTransactions),
              createdAt: Utils.formatDate(item.createdAt),
            }
          )
        }
        return res.status(200).render('index', { title: 'Alura Challenge 3ª Edição', data: imports })
      })
      .catch((error) => {
        return res.status(500).render('error', {title: 'Error', message: error})
      })
  }
}

module.exports = ImportController