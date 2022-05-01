const models = require('../models')

const Utils = require('../utils/Utils')

//Meus services
const EncryptPasswordHandler = require('../services/EncryptPasswordHandler')
const EmailHandler = require('./EmailHandler')

class UserService {
  static async create(user, callback = (erro) => {}){
    const password = Utils.generatePassword()
    try {
      const hash = EncryptPasswordHandler.generateHash(password)
      const newUser = {...user, password: hash}
      await models.Users.create(newUser)
      await EmailHandler.send(user, password)
      callback(false)
    } catch (error) {
      callback(error)
    }
  }

  static async findAll(callback = (erro) => {}){
    const emailUserDefault = 'admin@email.com.br'
    const Op = models.Sequelize.Op
    try {
      const allUsers = await models.Users.findAll({
        where: {
          email: {
            [Op.not]: emailUserDefault
          }
        }
      })
      callback(false)
      return allUsers
    } catch (error) {
      callback(error)
      return null
    }
  }

  static async findOneById(id, callback = (erro) => {}){
    try {
      const user = await models.Users.findOne({ where: { id: Number(id) } })
      callback(false)
      return user
    } catch (error) {
      callback(error)
      return null
    }
  }

  static async findOneByEmail(email, callback = (erro) => {}){
    try {
      const user = await models.Users.findOne({ where: { email } })
      callback(false)
      return user
    } catch (error) {
      callback(error)
      return null
    }
  }

  static async update(id, newInfos, callback = (erro) => {}){
    try {
      await models.Users.update(newInfos, { where: { id: Number(id) } })
      const userUpdated = await models.Users.findOne( { where: { id: Number(id) } } )
      callback(false)
      return userUpdated
    } catch (error) {
      callback(error)
      return null
    }
  }

  static async delete(id){
    try {
      await models.Users.destroy( {where: { id: Number(id) }} )
      return true
    } catch (error) {
      return false
    }
  }

  static signIn(req, res){
    //const {email, password} = req.body

    const password = '828557'
    const hash = '$2b$10$0uwppXnb8hxOPfmSZ4aZ3Ol4ERnfpV8OH2tM8FD0wl7Cp6041//jG'

    //TODO: metodo para localizar o usuário pelo email

    const match = EncryptPasswordHandler.compare(password, hash)

    return match
  }
}

module.exports = UserService