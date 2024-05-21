const express = require('express')
const router = express.Router()

const { ViewUser, UpdateUser, DeleteUser, login, Register, ViewUserDetail } = require('../controller/UserController.js')

router.get('/', ViewUser)
router.get('/:id', ViewUserDetail)
router.post('/login', login)
router.post('/', Register)
router.patch('/:id', UpdateUser)
router.delete('/:id', DeleteUser)

module.exports = router