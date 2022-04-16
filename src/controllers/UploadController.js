const { createReadStream } = require('fs')
const readline = require('readline')

const Utils = require('../utils/Utils')
const models = require('../models')

function arrayToObject(array){
  if(array){
    return {
      bancoOrigem: array[0],
      agenciaOrigem: array[1],
      contaOrigem: array[2],
      bancoDestino: array[3],
      agenciaDestino: array[4],
      contaDestino: array[5],
      valor: parseFloat(array[6]),
      dataHora: new Date(array[7]+'Z'),
    }
  }
  return null
}

//Verifica se na array passada existe algum item vazio
function isValidated(array){
  for (let item of array){
    if(item === '') return false
  }
  return true
}

function checkDate(firstDate, date){
  return firstDate.toDateString() === date.toDateString()
}

//dd-mm-yyyy
function formatDate(date){
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return `${day < 10 ? 0 : ''}${day}/${month < 10 ? 0 : ''}${month}/${year}`
}

//Verifica se já existe transações com essa data se sim alertar o usuário
async function checkDateTransactions(firstDate){
  const { QueryTypes } = require('sequelize')
  const dateFormated = formatDate(firstDate)
  const sql = `SELECT dateTransactions FROM Imports WHERE DATE_FORMAT(dateTransactions, '%d/%m/%Y') = '${dateFormated}';`
  const dateSelected = await models.sequelize.query(sql, {type: QueryTypes.SELECT})
  console.log('dateSelected: ', dateSelected)
  const sizeDateSelected = dateSelected.length
  console.log('sizeDateSelected: ', sizeDateSelected)
  return sizeDateSelected > 0
}

class UploadController {
  static async uploadFile(req, res){
    //TODO: implementar função de selecionar o separador do csv
    const { file } = req
    const {originalname, path, size} = file
    const textToSend = `O arquivo ${originalname} de ${Utils.bytesToMegabytes(size)}MB foi recebido e salvo em ${path}.`

    const readableFile = createReadStream(path)

    const transactionLines = readline.createInterface({
      input: readableFile
    })

    let count = 0
    let firstDate = new Date()

    for await (let line of transactionLines){
      const array = line.split(',')
      if (isValidated(array)){
        const transaction = arrayToObject(array)

        if (count === 0) {
          firstDate = transaction.dataHora
          const check = await checkDateTransactions(firstDate)
          if (check){
            return res.status(400).json({ message: `As transações do dia ${formatDate(firstDate)} já foram importadas!!!` })
          }else{
            await models.Imports.create({dateTransactions: firstDate})
          }
        }
        if (checkDate(firstDate, transaction.dataHora)){
          try {
            await models.Transactions.create(transaction)
          } catch (error) {
            throw error.message
          }
        }
      }
      count++
    }
    
    //TODO: Criar lógica para apagar arquivo do upload
    if(count === 0) return res.status(400).json({message: `O arquivo ${originalname} está vazio!!!`})

    return res.status(200).json(textToSend)
  }
}

module.exports = UploadController