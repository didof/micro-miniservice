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

function processEvent(type) {
    switch (type) {
        case 'PostCreated':
            return function (data) {
                const { id, title } = data
                posts[id] = { id, title, comments: [] }
            }
        case 'CommentCreated':
            return function (data) {
                const { postId, id, content } = data
                posts[postId].comments.push({ id, content })
            }
        default:
            console.error(`The event type ${type} is not recognized`)
    }
}

app.post('/events', (req, res) => {
    const { type, data } = req.body
    console.log(`Processing event of type ${type}`)

    processEvent(type)(data)


    console.log(`current posts: ${JSON.stringify(posts[data.postId])}`)

    res.status(201)
    res.send({ ok: true })
})

const PORT = 4002
app.listen(PORT, () => {
    console.log(`[query] Listening on ${PORT}`)
})