const express = require('express')
const router = express()

var bcrypt = require('bcryptjs')

// initialaize pg promise
const pgp = require('pg-promise')()

const connectionString = 'postgres://jljiweil:sdkd_pYcirHswK3wEg5PDoEuGxfrDkXX@chunee.db.elephantsql.com/jljiweil'

// use connectionString to create pg-promise object
const db = pgp(connectionString)

router.get('/', (req, res) => {
    res.render('login')
})

router.post('/log-in', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    db.one('SELECT user_id, username, password FROM users WHERE username = $1', [username])
    .then((user) => {
        // compare the password
        bcrypt.compare(password, user.password, function(error, result) {
            if(result){
                // user has been authenticated
                if(req.session) {
                    req.session.userId = user.user_id
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