const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handle GET requests to /products'
  })
})

router.post('/', (req, res, next) => {
  const product = {
     name: req.body.name,
     price: req.body.price
  }
  res.status(201).json({
    message: 'Handle POST requests to /products',
    createdProduct: product
  })
})

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId
  res.status(200).json({
    message: 'product id passed',
    id: id
  })
})

router.patch('/:productId', (req, res, next) => {
  const id = req.params.productId
  res.status(200).json({
    message: 'product is updated',
    id: id
  })
})

router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId
  res.status(200).json({
    message: 'product is deleted',
    id: id
  })
})

module.exports = router
