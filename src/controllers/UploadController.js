
function toMegabytes(bytes){
  const megaToBytes = Math.pow(10, 6)
  const mega = bytes / megaToBytes
  return mega
}


class UploadController {
  static uploadFile(req, res){
    const {originalname, path, size} = req.file
    const textToSend = `O arquivo ${originalname} de ${toMegabytes(size)}MB foi recebido e salvo em ${path}.`
    console.log(textToSend)
    return res.status(200).json({message: textToSend})
  }
}

module.exports = UploadController