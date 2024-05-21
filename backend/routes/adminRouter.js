const express = require('express')
const router = express.Router()

const { ViewAdmin, Register, login, ViewAdminDetail} = require('../controller/AdministratorController.js')

router.get('/', ViewAdmin)
router.get('/:id', ViewAdminDetail)
router.post('/register', Register)
router.post('/login', login)

module.exports = router