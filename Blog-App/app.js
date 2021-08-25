const express = require('express')
const app = express()

// require and configure dotenv
require('dotenv').config()

// create path for partials
const path = require('path')
const VIEWS_PATH = path.join(__dirname, '/views')

const session = require('express-session')

global.bcrypt = require('bcryptjs')

const authenticate = require('./authenticate/authenticateMiddleware')

const loginRouter = require('./routes/login')
const registerRouter = require('./routes/register')
const blogRouter = require('./routes/blogPost')


const mustacheExpress = require('mustache-express')

// setting up Express to use Mustache Express as template pages
app.engine('mustache', mustacheExpress(VIEWS_PATH + '/partials', '.mustache'))

// pages are located in views directory 
app.set('views', VIEWS_PATH)

// extenstions will be mustache
app.set('view engine', 'mustache')

app.use(express.urlencoded())


// middleware for session
app.use(session({
    secret: 'THISISSECRETKEY',
    saveUninitialized: true,
    resave: true
}))

app.use('/', loginRouter)
app.use('/register', registerRouter)
app.use('/travelBlog', authenticate, blogRouter)

app.use(express.static('public'))




app.listen(3000, () => {
    console.log("Server is running...")
})