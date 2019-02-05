const express = require('express')
const router = express.Router()
const multer = require('multer')
const checkAuth = require('../middleware/check-auth')
const ProductsController = require ('../controllers/products')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g,'-') + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter: fileFilter
})

router.get('/', ProductsController.productsGetAll)

router.post('/', checkAuth, upload.single('productImage'), ProductsController.productsCreate)

router.get('/:productId', ProductsController.productsGetSingle)

router.patch('/:productId', checkAuth, ProductsController.productsUpdateSingle)

router.delete('/:productId', checkAuth, ProductsController.productsDelete)

module.exports = router
