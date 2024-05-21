const express = require('express')
const { getNomer, PostNomer } = require('../controller/NomerController')
const router = express.Router()

router.get('/', getNomer)
router.post('/', PostNomer)

module.exports = router