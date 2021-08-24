
function authenticate (req, res, next) {
    console.log('Authenticate Middleware')
    if(req.session) {
        if(req.session.userId) {
            next()
        } else {
            res.redirect('/')
        }
    } else {
        res.redirect('/')
    }
}


module.exports = authenticate
