const express = require('express')
const router = express()

const models = require('../models')
 
router.get('/', (req, res) => {
    const userId = req.session.userId
    // get all posts from the database
    models.Post.findAll({
        where: {
            user_id: userId
        },
        include: [
            {
                model: models.Comment,
                as: 'comments'
            }
        ]
    })
    .then(posts => {
        res.render('blog', {posts: posts, comments: posts.comments})
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

router.post('/add-comment', (req, res) => {
    const commentTitle = req.body.commentTitle
    const commentBody = req.body.commentBody
    const postId = req.body.postId

    const comment = models.Comment.build({
        title: commentTitle,
        body: commentBody,
        post_id: postId
    })
    comment.save()
    .then(() => {
        res.redirect('/travelBlog')
    })
})

module.exports = router
