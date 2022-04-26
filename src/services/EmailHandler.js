const nodemailer = require('nodemailer')

var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "f7bcb2a8789d89",
    pass: "d6b24fbec668c4"
  }
})

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