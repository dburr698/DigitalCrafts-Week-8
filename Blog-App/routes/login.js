const express = require('express')
const router = express()

const models = require('../models')

router.get('/', (req, res) => {
    res.render('login')
})

router.post('/log-in', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    models.User.findOne({where: {username: username}})
    .then((user) => {
        // compare the password
        bcrypt.compare(password, user.password, function(error, result) {
            if(result){
                // user has been authenticated
                if(req.session) {
                    req.session.userId = user.id
                }
                res.redirect('/travelBlog')
            } else {
                // user is not authenticated
                res.render('login', {errorMessage: 'Password is wrong'})
            }
        })
    }).catch((error) => {
        res.render('login', {errorMessage: "User not found"})
    })
})

module.exports = router