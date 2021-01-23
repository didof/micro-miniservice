const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors())

const events = []

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event)
  console.log(events)

  const ports = [4000, 4001, 4002, 4003]

  ports.forEach(async port => {
    try {
      await axios.post(`http://localhost:${port}/events`, event)
    } catch (error) {
      console.error(`Impossible contact ${port}`)
    }
  })

  res.send({ ok: true });
});

app.get('/events', (req, res) => {
  console.log('requested sync of all events')

  res.status(200)
  res.send(events)
})

app.listen(4005, () => {
  console.log('Listening on 4005');
});
