const nodemailer = require('nodemailer')

const emailConfig = require('../config/email.config.json')

var transport = nodemailer.createTransport(emailConfig)

function buildMessageInHtml(user){
  return {
    from: "noreplay@finance.com.br",
    to: user.email,
    subject: "Alura Challenge Transaction Analysis",
    text: `Olá ${user.name} sua senha é ${user.pass}`,
    html: `

    <h1>Olá ${user.name}</h1>
  
    <p>Email: ${user.email} <br/> Senha: ${user.pass}</p>
    
    `
  }
}

class EmailHandler {
  static send(user, pass){

    var message = buildMessageInHtml({...user, pass})

    return transport.sendMail(message)
  }
}

module.exports = EmailHandler