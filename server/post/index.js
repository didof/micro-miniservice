const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')
const brokerUrl = 'http://localhost:4005/events'

const app = express()

const posts = {}

app.use(cors())
app.use(bodyParser.json())

app.get('/posts', (req, res) => {
    res.status(200)
    res.send(posts)
})

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex')
    const { title } = req.body

    posts[id] = { id, title }

    await axios.post(brokerUrl, { type: 'PostCreated', data: posts[id] })

    res.status(201)
    res.send(posts[id])
})

app.post('/events', (req, res) => {
    console.log('received event: ', req.body.type)
    res.status(200)
    res.send({ ok: true })
})

const PORT = 4000
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})