const { createReadStream } = require('fs')
const readline = require('readline')

const optionsDefault = {
  delimiter: ';',
  hasColumnsName: false,
}

class Csv {
  
  constructor(file, options = optionsDefault){
    this.file = file
    this.options = options
    this.columnsName = null
    this.numLines = 0
    this.objects = []
  }

  arrayToObject(array){
    if(array){
      let obj = {}
      this.columnsName.map((val, index, itens) => {
        const column = val.replaceAll('"', '').replaceAll("'", "")
        obj[column] = array[index]
      })
      return obj
    }
    return null
  }

  async read(){
    const {path} = this.file
    const readableFile = createReadStream(path)

    const transactionLines = readline.createInterface({
      input: readableFile
    })

    let count = 0
    let arrayOfObject = []

    for await (let line of transactionLines){
      const array = line.split(this.options.delimiter)
      if(this.options.hasColumnsName & count === 0){
        this.columnsName = array
        count += 1
      } else {
        arrayOfObject.push(this.arrayToObject(array))
        count += 1
      }
    }

    this.numLines = count
    this.objects = arrayOfObject
    return arrayOfObject
  }

  getColumnsNames(){
    return this.columnsName
  }

  setColumnsNames(ArrayColumnsNames){
    this.columnsName = ArrayColumnsNames
  }

  getNumLines(){
    return this.numLines
  }

  getFirstLine(){
    return this.objects[0]
  }

  isEmpty(){
    return this.numLines > 0 ? false : true
  }
}

module.exports = Csv