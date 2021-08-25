const express = require('express')
const router = express()

const models = require('../models')

router.get('/', (req, res) => {
    res.render('register')
})

router.post('/sign-up', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    bcrypt.genSalt(10, function(error, salt) {
        if(!error) {
            bcrypt.hash(password, salt, function(error, hash) {
                if(!error) {
                    // create user object
                    const user = models.User.build({
                        username: username,
                        password: hash
                    })
                    // save user
                    user.save()
                    .then(savedUser => {
                        console.log("User added")
                        res.redirect('/')
                    })

                } else {
                    res.send('Error occured')
                }
            })
        } else {
            res.send("Error occured")
        }
    })
})

module.exports = router