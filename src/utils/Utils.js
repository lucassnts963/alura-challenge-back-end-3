const fs = require('fs')
const { Readable } = require('stream')
const readline = require('readline')

class Utils{

  static bytesToMegabytes(bytes){
    const megaToBytes = Math.pow(10, 6)
    const mega = bytes / megaToBytes
    return mega
  }

  static csvToJson(path, separator = ';'){
    fs.readFile(path, async (erro, buffer) => {
      if(erro) throw erro
      
      const readableFile = new Readable()
      readableFile.push(buffer)
      readableFile.push(null)

      const lines = readline.createInterface({
        input: readableFile,
      })

      for await (let line of lines){
        console.log(line)
      }
    })
  }
}

module.exports = Utils