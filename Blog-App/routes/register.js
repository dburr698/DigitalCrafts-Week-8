const express = require('express')
const router = express()

var bcrypt = require('bcryptjs')

// initialaize pg promise
const pgp = require('pg-promise')()

const connectionString = 'postgres://jljiweil:sdkd_pYcirHswK3wEg5PDoEuGxfrDkXX@chunee.db.elephantsql.com/jljiweil'

// use connectionString to create pg-promise object
const db = pgp(connectionString)

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
                    db.none('INSERT INTO users(username, password) VALUES($1, $2)', [username, hash])
                    .then(() => {
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