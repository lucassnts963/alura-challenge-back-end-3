
function getRandomInt(min = 0, max = 9){
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

function hasZero(num){
  return num < 10 ? 0 : ''
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
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    if(showHours){
      return `
        ${hasZero(day)}${day}/${hasZero(month)}${month}/${year} - 
        ${hasZero(hours)}${hours}:${hasZero(minutes)}${minutes}:${hasZero(seconds)}${seconds}`
    }

    return `${hasZero(day)}${day}/${hasZero(month)}${month}/${year}`
  }

  static generatePassword(numDigits = 6){
    let password = ''
    for(let i =0; i < numDigits; i++){
      password += getRandomInt()
    }
    return password
  }

  static changeFormats(transaction){
    return {
      ...transaction,
      valor: parseFloat(transaction.valor),
      dataHora: new Date(transaction.dataHora+'Z'),
    }
  }

}

module.exports = Utils