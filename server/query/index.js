const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

const posts = {}

app.use(bodyParser.json())
app.use(cors())

app.get('/posts', (req, res) => {
    res.status(200)
    res.send(posts)
})

app.post('/events', (req, res) => {
    const { type, data } = req.body

    switch (type) {
        case 'PostCreated':
            posts[data.id] = {
                id: data.id,
                title: data.title,
                comments: []
            }

            break;
        case 'CommentCreated':
            post[data.postId].comments.push({
                id: data.id,
                content: data.content
            })

            break;
    }

    console.log('process event:', req.body.type)
    res.status(201)
    res.send({ ok: true })
})

const PORT = 4002
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})