const fs = require('fs')
const { Readable } = require('stream')
const readline = require('readline')


class Utils{
  
  static bytesToMegabytes(bytes){
    const megaToBytes = Math.pow(10, 6)
    const mega = bytes / megaToBytes
    return mega
  }
}

module.exports = Utils