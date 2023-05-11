const express = require('express')
const Controller = require('../controllers/controller')
const registerRouter = require('./register')
const loginRouter = require('./login')
const homeRouter = require('./home')
const router = express.Router()

router.get('/', Controller.landingPage)
router.use('/register', registerRouter)
router.use('/login', loginRouter)
router.use(function (req, res, next) {
    console.log(req.session.role);
    if(!req.session.userId){
        const error = 'Please Login First !'
        res.redirect(`/login?error=${error}`)
    } else {
        next()
    }
})

const ab = function (req, res, next) {
    console.log(req.session.role);
    if(req.session.role){
        const error = 'Please Login First !'
        res.redirect(`/login?error=${error}`)
    } else {
        next()
    }
}


router.use('/home', homeRouter)

module.exports = router