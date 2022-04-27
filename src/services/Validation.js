const UserService = require('../services/UserService')
const Utils = require('../utils/Utils')
const models = require('../models')

class Validation {
  static async registeredEmail(email, callback = (exist, err) => {}){
    try {
      const user =  await UserService.findOneByEmail(email)
      if(user){
        callback(true, false)
      } else {
        callback(false, false)
      }
    } catch (error) {
      callback(null, error)
    }
  }

  //Verifica se já existe transações com essa data se sim alertar o usuário
  static async checkDateTransactions(firstDate){
    const { QueryTypes } = require('sequelize')
    const dateFormated = Utils.formatDate(firstDate)
    const sql = `SELECT dateTransactions FROM Imports WHERE DATE_FORMAT(dateTransactions, '%d/%m/%Y') = '${dateFormated}';`
    const dateSelected = await models.sequelize.query(sql, {type: QueryTypes.SELECT})
    const sizeDateSelected = dateSelected.length
    const hasTransactions = sizeDateSelected > 0
    return hasTransactions
  }

  //Verifica se a data é do mesmo dia
  static checkDate(firstDate, date){
    return firstDate.toDateString() === date.toDateString()
  }

  //Verifica se existe um transação tem alguma informação em branco
  static somethingIsMissing(transaction){
    let isMissing = false
    Object.keys(transaction).forEach((key, index) => {
      const value = transaction[key]
      if(!value){
        isMissing = true
      }
   })
   return isMissing
  }
}

module.exports = Validation