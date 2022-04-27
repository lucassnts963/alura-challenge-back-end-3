const bcrypt = require('bcrypt')

class EncryptPasswordHandler{

  static generateHash(password){
    return bcrypt.hashSync(password, 10)
  }

  static compare(password, hash){
    return bcrypt.compareSync(password, hash)
  }

}

module.exports = EncryptPasswordHandler