const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors = require('cors')


const app = express()

const commentsById = {}

app.use(cors())
app.use(bodyParser.json())

app.get('/posts/:id/comments', (req, res) => {
    res.status(200)
    res.send(commentsById[req.params.id] || [])
})

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex')
    const { content } = req.body

    const comments = commentsById[req.params.id] || []

    comments.push({ id: commentId, content })

    commentsById[req.params.id] = comments

    res.status(201)
    res.send(comments)
})

const PORT = 4001
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})