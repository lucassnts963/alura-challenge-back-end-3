const Validation = require('../services/Validation')

//Meus services
const UserService = require('../services/UserService')

class UserController {
  static async create(req, res){
    const {name, email} = req.body
    const newUser = {name, email}

    Validation.registeredEmail(email, (exist, error) => {
      if(!error & !exist){
        UserService.create(newUser, (error) => {
          if(!error){
            return res.status(200).render('alert', {title: 'Aviso', message: 'Usuário criado, verifique seu E-mail para pegar a senha de acesso!!!'})
          } else {
            return res.status(500).render('error', {title: 'Error', message: `Falha ao criar usuário!!! O erro registrado foi: ${error.message}`})
          }
        })
      } else {
        return res.status(500).render('error', {title: 'Error', message: `Email já Cadastrado!`})
      }
    })
    
  }
}

module.exports = UserController