const express = require('express')
const { getAntrian, createAntrian, updateAntrian, getDetail, deleteAntrian } = require('../controller/AntrianController')
const router = express.Router()
 

router.get('/', getAntrian)
router.get('/:user', getDetail)
router.post('/' , createAntrian)
router.patch('/:_id', updateAntrian)
router.delete('/:_id', deleteAntrian)


module.exports = router