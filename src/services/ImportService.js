const models = require('../models')

class ImportService{
  static async findAll(callback = error => {}){
    try {
      const allImports = await models.Imports.findAll()
      callback(false)
      return allImports
    } catch (error) {
      callback(error)
      return null
    }
  }

  static async create(newImport, callback = error => {}){
    try {
      const importCreated = await models.Imports.create(newImport)
      callback(false)
      return importCreated
    } catch (error) {
      callback(error)
      return null
    }
  }
}

module.exports = ImportService