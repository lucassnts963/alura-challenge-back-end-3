const models = require('../models')

const Validation = require('../services/Validation')

class TransactionService {
  static async create(transaction, callback = error => {}){
    const somethingIsMissing = Validation.somethingIsMissing(transaction)

    //Ignora se estiver faltando informação
    if(!somethingIsMissing){
      try {
        const transactionCreated = await models.Transactions.create(transaction)
        callback(false)
        return transactionCreated
      } catch (error) {
        callback(error)
        return null
      }
    }
  }

  static async bulkCreate(transactions, callback = error => {}){
    try {
      await models.Transactions.bulkCreate(transactions)
      callback(false)
    } catch (error) {
      callback(error)
    }
  }
}

module.exports = TransactionService