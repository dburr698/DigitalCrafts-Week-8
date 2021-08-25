const express = require('express')
const router = express()

const models = require('../models')
 
router.get('/', (req, res) => {
    const userId = req.session.userId
    // get all posts from the database
    models.Post.findAll({
        where: {
            user_id: userId
        }
    })
    .then(posts => {
        res.render('blog', {posts: posts})
    })
})

router.post('/add-post', (req, res) => {
    const title = req.body.title
    const body = req.body.body
    const userId = parseInt(req.session.userId)
    // create post object
    const post = models.Post.build({
        title: title,
        body: body,
        user_id: userId
    })
    // save post object
    post.save()
    .then(() => {
        res.redirect('/travelBlog/')
    })
})

router.post('/delete-post', (req, res) => {
    const postID = parseInt(req.body.post_id)

    models.Post.destroy({
        where: {
            id: postID
        }
    })
    .then(() => {
        res.redirect('/travelBlog/')
    })
})


module.exports = router
