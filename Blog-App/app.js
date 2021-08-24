const express = require('express')
const app = express()

const session = require('express-session')

const authenticate = require('./authenticate/authenticateMiddleware')

const loginRouter = require('./routes/login')
const registerRouter = require('./routes/register')
const blogRouter = require('./routes/blogPost')


const mustacheExpress = require('mustache-express')

// setting up Express to use Mustache Express as template pages
app.engine('mustache', mustacheExpress())

// pages are located in views directory 
app.set('views', './views')

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