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

  static async findAll(req, res){
    const users = await UserService.findAll((error) => {
      if(error){
        return res.status(500).render('error', { title: 'Error', message: error.message })
      }
    })
    return res.status(200).render('users', { title: 'Usuários', users: users })
  }

  static async delete(req, res){
    const { id } = req.params
    const { email } = req.session
    const user = await UserService.findOneByEmail(email, error => {
      if(error){
        return res.sendStatus(500)
      }
    })
    if(!(user.id == Number(id))){
      const isDeleted = await UserService.delete(id)
      if(isDeleted){
        return res.sendStatus(200)
      }
    } else {
      return res.sendStatus(401)
    }
  }

  static async update(req, res){
    const { id } = req.params
    const newInfos = req.body
    console.log(newInfos)
    const userUpdated = await UserService.update(Number(id), newInfos, error => {
      if(error){
        return res.sendStatus(500)
      } else{
        return res.sendStatus(200)
      }
    })
    console.log(userUpdated)
  }
}

module.exports = UserController