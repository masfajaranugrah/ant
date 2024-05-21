const express = require('express')
const { getAntrian, createAntrian, updateAntrian, getDetail } = require('../controller/AntrianController')
const router = express.Router()
 

router.get('/', getAntrian)
router.get('/:user', getDetail)
router.post('/' , createAntrian)
router.patch('/:_id', updateAntrian)


module.exports = router