const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const serverURL = 'http://localhost:3000'

const Order = require('../models/order')
const Product = require('../models/product')

router.get('/', (req, res, next) => {
  Order.find()
    .select('product quantity _id')
    .populate('product', 'name price _id')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            request: {
              type: 'GET',
              url: serverURL + '/orders/' + doc._id
            }
          }
        })
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
})

router.post('/', (req, res, next) => {
  Product.findById(req.body.productId)
    .then(product => {
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
      })
      return order.save()
    })
    .then(result => {
      console.log(result)
      res.status(201).json({
        message: 'Order stored',
        createdOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity
        },
        request: {
          type: 'GET',
          url: serverURL + '/orders/' + result._id
        }
      })
    })
    .catch(err => {
      res.status(500).json({
        message: 'Product not found',
        error: err
      })
    })
})

router.get('/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId)
    .populate('product', 'name price _id')
    .exec()
    .then(order => {
      res.status(200).json({
        order: order,
        request: {
          type: 'GET',
          url: serverURL + '/orders'
        }
      })
    })
    .catch(err => {
      res.status(500).json({
        message: 'Order not found',
        error: err
      })
    })
})

router.delete('/:orderId', (req, res, next) => {
  Order.remove({ _id: req.params.orderId})
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Order deleted',
        request: {
          type: 'POST',
          url: serverURL + '/orders',
          body: { productId: 'ID', quantity: 'Number'}
        }
      })
    })
    .catch(err => {
      res.status(500).json({
        message: 'Order not found',
        error: err
      })
    })
})

module.exports = router
