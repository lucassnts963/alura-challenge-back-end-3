const UserService = require('./UserService')

const EncryptPasswordHandler = require('./EncryptPasswordHandler')


class AuthHandler {
  static async signIn(req, res, next) {
    const { email, password } = req.body
    
    const user = await UserService.findOneByEmail(email, (error) => {
      if(!error){
        res.status(200)
      }else{
        res.status(500).render('error', { title: 'Error', message: `Erro ao tentar localizar email. (${error.message})` })
      }
    })
  
    //Lógica do Login
    const passwordIsValidated = EncryptPasswordHandler.compare(password, user.password)
    if (email == user.email && passwordIsValidated){
      res.locals.email = email
      req.session.loggedIn = true
      req.session.email = res.locals.email
      return res.redirect('/')
    } else {
      return res.sendStatus(401)
    }
  }

  static async isLogged(req, res, next){
    const { loggedIn } = req.session
    if(loggedIn){
      next()
    }else{
      return res.redirect('/authenticate')
    }
  }

  static async logout(req, res){
    req.session.destroy(error => {
      return res.redirect('/authenticate')
    })
  }
}

module.exports = AuthHandler