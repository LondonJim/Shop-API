const mongoose = require('mongoose')

const Order = require('../models/order')
const Product = require('../models/product')

exports.ordersGetAll = (req, res, next) => {
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
              url: req.get('host') + '/orders/' + doc._id
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
}

exports.ordersCreate = (req, res, next) => {
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
          url: req.get('host') + '/orders/' + result._id
        }
      })
    })
    .catch(err => {
      res.status(500).json({
        message: 'Product not found',
        error: err
      })
    })
}

exports.ordersGetSingle = (req, res, next) => {
  Order.findById(req.params.orderId)
    .populate('product', 'name price _id')
    .exec()
    .then(order => {
      res.status(200).json({
        order: order,
        request: {
          type: 'GET',
          url: req.get('host') + '/orders'
        }
      })
    })
    .catch(err => {
      res.status(500).json({
        message: 'Order not found',
        error: err
      })
    })
}

exports.ordersDelete = (req, res, next) => {
  Order.remove({ _id: req.params.orderId})
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Order deleted',
        request: {
          type: 'POST',
          url: req.get('host') + '/orders',
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
}
