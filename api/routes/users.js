const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UsersController = require('../controllers/users')

router.post('/signup', UsersController.usersSignUp)

router.post('/login', UsersController.usersLogin)

router.delete('/:userId', UsersController.usersDelete)

module.exports = router
