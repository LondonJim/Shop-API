const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Orders fetched'
  })
})

router.post('/', (req, res, next) => {
  res.status(201).json({
    message: 'Orders created'
  })
})

router.get('/:orderId', (req, res, next) => {
  res.status(200).json({
    message: 'Individual order details'
  })
})

router.delete('/:orderId', (req, res, next) => {
  res.status(200).json({
    message: 'Individual order deleted'
  })
})

module.exports = router
