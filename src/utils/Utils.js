const fs = require('fs')
const { Readable } = require('stream')
const readline = require('readline')


class Utils{
  
  static bytesToMegabytes(bytes){
    const megaToBytes = Math.pow(10, 6)
    const mega = bytes / megaToBytes
    return mega
  }

  //dd-mm-yyyy
static formatDate(date){
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return `${day < 10 ? 0 : ''}${day}/${month < 10 ? 0 : ''}${month}/${year}`
}
}

module.exports = Utils