const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')
const brokerUrl = 'http://localhost:4005/events'

const app = express()

const commentsById = {}

app.use(cors())
app.use(bodyParser.json())

app.get('/posts/:id/comments', (req, res) => {
    res.status(200)
    res.send(commentsById[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex')
    const { content } = req.body

    const comments = commentsById[req.params.id] || []

    comments.push({ id: commentId, content })

    commentsById[req.params.id] = comments

    await axios.post(brokerUrl, {
        type: 'CommentCreated',
        data: {
            postId: req.params.id,
            id: commentId,
            content
        }
    })

    res.status(201)
    res.send(comments)
})

app.post('/events', (req, res) => {
    console.log('received event: ', req.body.type)
    res.status(200)
    res.send({ ok: true })
})

const PORT = 4001
app.listen(PORT, () => {
    console.log(`[comments] Listening on ${PORT}`)
})