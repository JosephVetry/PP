const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()


router.get('/', Controller.home)
router.get('/test', Controller.test)
router.get('/delete/:id', Controller.delete)

module.exports = router