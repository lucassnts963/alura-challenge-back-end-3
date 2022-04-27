const Csv = require('../utils/csv')

const Utils = require('../utils/Utils')

const Validation = require('../services/Validation')
const TransactionService = require('../services/TransactionService')
const ImportService = require('./ImportService')

function getCsv(file){
  const csv = new Csv(file, { delimiter: ',' })
  csv.setColumnsNames([
    'bancoOrigem', 
    'agenciaOrigem', 
    'contaOrigem', 
    'bancoDestino', 
    'agenciaDestino', 
    'contaDestino', 
    'valor', 
    'dataHora'
  ])
  return csv
}

class FileHandler {

  constructor(file){
    this.csv = getCsv(file)
  }
  async validate(){
    this.transactions = await this.csv.read()
    
    if(this.csv.isEmpty()){
      return { hasBeenValidated: false, message: 'O arquivo está vazio.' }
    }
    
    const firstTransaction = Utils.changeFormats(this.transactions[0])
    const check = await Validation.checkDateTransactions(firstTransaction.dataHora)

    if(check){
      return { hasBeenValidated: false, message:  'O arquivo já foi importado anteriormente.' }
    }

    return { hasBeenValidated: true, message: 'Arquivo validado!' }
  }

  async getTransactionsValidated(){
    const transactionsValidated = []
    this.transactions.forEach((transaction, index) => {
      const somethingIsMissing = Validation.somethingIsMissing(transaction)
      if(!somethingIsMissing){
        const validatedTransaction = Utils.changeFormats(transaction)
        transactionsValidated.push(validatedTransaction)
      }
    })

  return transactionsValidated
  }

  async writeTransactionsToDatabase(callback = error => {}){
    const transactions = await this.getTransactionsValidated()
    TransactionService.bulkCreate(transactions, error => {
      if(!error){
        callback(false)
      }else{
        callback(error)
      }
    })
  }

  async writeDataToDatabase(callback = error => {}){
    const {hasBeenValidated, message} = await this.validate()
    
    if(hasBeenValidated){
      try {
        const dateTransactions = this.transactions[0].dataHora
        await this.writeTransactionsToDatabase(callback)
        await ImportService.create({ dateTransactions })
        callback(false)
      } catch (error) {
        callback(error)
      }
    } else {
      callback({message})
    }
  }
}

module.exports = FileHandler