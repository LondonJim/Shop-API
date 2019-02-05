const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')
const OrdersController = require('../controllers/orders')

router.get('/', checkAuth, OrdersController.ordersGetAll)

router.post('/', checkAuth, OrdersController.ordersCreate)

router.get('/:orderId', checkAuth, OrdersController.ordersGetSingle)

router.delete('/:orderId', checkAuth, OrdersController.ordersDelete)

module.exports = router
