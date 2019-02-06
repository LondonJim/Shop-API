const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')
const UsersController = require('../controllers/users')

router.post('/signup', UsersController.usersSignUp)

router.post('/login', UsersController.usersLogin)

router.delete('/delete/:userId', UsersController.usersDelete)

module.exports = router
