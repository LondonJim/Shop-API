const Product = require('../models/product')
const mongoose = require('mongoose')

exports.productsGetAll = ((req, res, next) => {
  Product.find()
    .select('name price _id productImage')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            name: doc.name,
            price: doc.price,
            productImage: doc.productImage,
            _id: doc._id,
            request: {
              type: 'GET',
              url: req.get('host') + '/products/' + doc._id
            }
          }
        })
      }
      res.status(200).json(response)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

exports.productsCreate = ((req, res, next) => {
  console.log(req.file.path)
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path
  })
  product
    .save()
    .then(result => {
      console.log(result)
      res.status(201).json({
        message: 'Created product successfully',
        createdProduct: {
          name: result.name,
          price: result.price,
          _id: result._id,
          request: {
            type: 'GET',
            url: req.get('host') + '/products/' + result._id
          }
        }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: err})
    })
})

exports.productsGetSingle = ((req, res, next) => {
  const id = req.params.productId
  Product.findById(id)
    .select('name price _id productImage')
    .exec()
    .then(doc => {
      console.log('From database', doc)
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: 'GET',
            description: 'Get all products',
            url: req.get('host') + '/products'
          }
        })
      } else {
          res.status(404).json({message: 'No valid ID found'})
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: err})
    })
})

exports.productsUpdateSingle = ((req, res, next) => {
  const id = req.params.productId
  const updateOps = {}
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value
  }
  Product.update({_id: id}, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result)
      res.status(200).json({
        message: 'Product updated',
        request: {
          type: 'GET',
          url: req.get('host') + '/products/' + id
        }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

exports.productsDelete = ((req, res, next) => {
  const id = req.params.productId
  Product.remove({_id: id})
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Product deleted',
        request: {
          type: 'POST',
          url: req.get('host') + '/products',
          data: { name: 'String', price: 'Number' }
        }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})
