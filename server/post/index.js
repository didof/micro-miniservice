const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors = require('cors')


const app = express()

const posts = {}

app.use(cors())
app.use(bodyParser.json())

app.get('/posts', (req, res) => {
    res.status(200)
    res.send(posts)
})

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex')
    const { title } = req.body

    posts[id] = { id, title }

    res.status(201)
    res.send(posts[id])
})

const PORT = 4000
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})