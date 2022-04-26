
function getRandomInt(min = 0, max = 9){
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

class Utils{
  
  static bytesToMegabytes(bytes){
    const megaToBytes = Math.pow(10, 6)
    const mega = bytes / megaToBytes
    return mega
  }

  //dd-mm-yyyy
  static formatDate(date, showHours = false){
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    //TODO: Implementar hora caso seja necessário mostrar

    return `${day < 10 ? 0 : ''}${day}/${month < 10 ? 0 : ''}${month}/${year}`
  }

  static generatePassword(numDigits = 6){
    let password = ''
    for(let i =0; i < numDigits; i++){
      password += getRandomInt()
    }
    return password
  }

}

module.exports = Utils