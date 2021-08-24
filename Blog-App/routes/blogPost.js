const express = require('express')
const router = express()

// initialaize pg promise
const pgp = require('pg-promise')()

const connectionString = 'postgres://jljiweil:sdkd_pYcirHswK3wEg5PDoEuGxfrDkXX@chunee.db.elephantsql.com/jljiweil'

// use connectionString to create pg-promise object
const db = pgp(connectionString)

router.get('/', (req, res) => {
    const userId = req.session.userId
    // get all posts from the database
    db.any('SELECT post_id, title, body, date_created, date_updated, is_published FROM posts WHERE user_id = $1', [userId])
    .then(posts => {
        res.render('blog', {posts: posts})
    })
})

router.post('/add-post', (req, res) => {
    const title = req.body.title
    const body = req.body.body
    const userId = req.session.userId
    db.none('INSERT INTO posts(title, body, user_id) VALUES($1, $2, $3)',[title, body, userId])
    .then(() => {
        res.redirect('/travelBlog/')
    })
})

router.post('/delete-post', (req, res) => {
    const postID = parseInt(req.body.post_id)

    db.none('DELETE FROM posts WHERE post_id = $1', [postID])
    .then(() => {
        res.redirect('/travelBlog/')
    })
})


module.exports = router
