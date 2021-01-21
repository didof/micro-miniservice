const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.post('/events', (req, res) => {
    const event = req.body

    console.log(event)

    axios.post('http://localhost:4000/events', event)
    axios.post('http://localhost:4001/events', event)
    axios.post('http://localhost:4002/events', event)

    res.status(200)
    res.send({ ok: true })
})


const PORT = 4005
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})