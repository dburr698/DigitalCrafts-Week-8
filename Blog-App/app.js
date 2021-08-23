const express = require('express')
const app = express()

// initialaize pg promise
const pgp = require('pg-promise')()

const connectionString = 'postgres://jljiweil:sdkd_pYcirHswK3wEg5PDoEuGxfrDkXX@chunee.db.elephantsql.com/jljiweil'

// use connectionString to create pg-promise object
const db = pgp(connectionString)

const mustacheExpress = require('mustache-express')

// setting up Express to use Mustache Express as template pages
app.engine('mustache', mustacheExpress())

// pages are located in views directory 
app.set('views', './views')

// extenstions will be mustache
app.set('view engine', 'mustache')

app.use(express.urlencoded())

app.use(express.static('public'))

app.get('/', (req, res) => {
    // get all posts from the database
    db.any('SELECT post_id, title, body, date_created, date_updated, is_published FROM posts')
    .then(posts => {
        res.render('blog', {posts: posts})
    })
})

app.post('/add-post', (req, res) => {
    const title = req.body.title
    const body = req.body.body
    db.none('INSERT INTO posts(title, body) VALUES($1, $2)',[title, body])
    .then(() => {
        res.redirect('/')
    })
})

app.post('/delete-post', (req, res) => {
    const postID = parseInt(req.body.post_id)

    db.none('DELETE FROM posts WHERE post_id = $1', [postID])
    .then(() => {
        res.redirect('/')
    })

})


app.listen(3000, () => {
    console.log("Server is running...")
})