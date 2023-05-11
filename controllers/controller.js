const { Account, Book, Profile, RentBook } = require('../models')
const bcrypt = require('bcryptjs');
class Controller{
    static test(req, res){
        res.send("ini test")
    }

    static landingPage(req, res){
        res.render('landingPage')
    }
    static register(req, res){
        res.render('formRegister')
    }
    static postRegister(req, res){
        const { username, email, password } = req.body
        Account.create({ username, email, password })
            .then(res.redirect('/'))
            .catch(err => res.send(err))
    }
    static login(req, res){
        const { error } = req.query
        res.render('login', { error })
    }
    static postLogin(req, res){
        const { email, password } = req.body
        // console.log({email,password});

        Account.findOne({where: { email }})
            .then(user => {
                // console.log(user);

                if(user){
                    const isValidPassword = bcrypt.compareSync( password , user.password)
                    if(isValidPassword){
                        req.session.userId = user.id
                        req.session.role = user.role
                        return res.redirect('/home')
                    } else {
                        const error = "Invalid Email/Password"
                        return res.redirect(`/login?error=${error}`)
                    }

                } else {
                    const error = "Invalid Email/Password"
                    return res.redirect(`/login?error=${error}`)
                }
            })
    }
    static home(req, res){
        Book.findAll()
            .then(data => res.render('home', { data }))
            .catch(err => res.send(err))
    }   
    static delete(req, res){
        const bookId = req.params.id
        Book.destroy({
            where:{
                id: bookId
            }
        })
            .then(data => res.redirect('/home'))
            .catch(err => res.send(err))
    }
}
module.exports = Controller