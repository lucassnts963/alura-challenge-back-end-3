const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const splitName = file.originalname.split('.')
    const extension = splitName[splitName.length - 1]
    cb(null, `${file.fieldname} - ${uniqueSuffix}.${extension}`)
  }
})

const upload = multer({storage})

module.exports = {
  upload
}