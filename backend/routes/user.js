const express = require('express')
import { loginUser, signupUser } from '../controllers/userController.js'

const router = express.Router()

// login
router.post('/login', loginUser)

// sign up
router.post('/signup', signupUser)

module.exports = { router }