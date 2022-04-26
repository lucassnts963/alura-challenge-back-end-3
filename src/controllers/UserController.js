const models = require('../models')
const bcrypt = require('bcrypt')

const Utils = require('../utils/Utils')
const EmailHandler = require('../services/EmailHandler')

class UserController {
  static async create(req, res){
    const {name, email} = req.body
    const password = Utils.generatePassword()
    bcrypt.hash(password, 10)
      .then(async (hash) => {
        const newUser = {name, email, password: hash}
        try {
          await models.Users.create(newUser)
          EmailHandler.send(newUser, password).then(result => {
            return res.status(200).render('alert', {title: 'Aviso', message: 'Usuário criado verifique seu Email para pegar a senha de acesso!!!'})
          }).catch(error => {
            return res.status(500).render('error', {title: 'Error', message: `Falha no envio do email!!! O erro registrado foi: ${error.message}`})
          })
        } catch (error) {
          return res.status(500).render('error', {title: 'Error', message: `Falha na criação do usuário!!! O erro registrado foi: ${error.message}`})
        }
      })
      .catch((error) => {
        return res.status(500).render('error', {title: 'Error', message: error.message})
      })
  }

  static async findAll(req, res){
    try {
      const allUsers = await models.Users.findAll()
      return res.status(200).render('alert', {title: 'Aviso', message: 'Todos usuários encontrados.'})
    } catch (error) {
      return res.status(500).render('error', {title: 'Error', message: 'Erro ao tentar localizar usuários.'})
    }
  }

  static async findOneById(req, res){
    const { id } = req.params
    try {
      const user = await models.Users.findOne({ where: { id: Number(id) } })
      return res.status(200).render('alert', {title: 'Aviso', message: 'Usuário encontrado!!'})
    } catch (error) {
      return res.status(500).render('error', {title: 'Error', message: 'Erro ao tentar localizar usuário.'})
    }
  }


  static async update(req, res){
    const { id } = req.params
    const newInfos = req.body
    try {
      await models.Users.update(newInfos, { where: { id: Number(id) } })
      const userUpdated = await models.Users.findOne( { where: { id: Number(id) } } )
      return res.status(200).json(userUpdated)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async delete(req, res){
    const { id } = req.params

    try {
      await models.Users.destroy( {where: { id: Number(id) }} )
      return res.status(200).json({ mensagem: `Pessoa com o id ${id} deletada!!!` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static signIn(req, res){
    //const {email, password} = req.body

    const password = '828557'
    const hash = '$2b$10$0uwppXnb8hxOPfmSZ4aZ3Ol4ERnfpV8OH2tM8FD0wl7Cp6041//jG'

    //TODO: metodo para localizar o usuário pelo email

    bcrypt.compare(password, hash)
      .then((result) => {
        if(result){
          return res.status(200).send('Login sucess!!!')
        }
      })
      .catch((error) => {
        return res.render('error', {title: 'Error', message: error.message})
      })
  }
}

module.exports = UserController