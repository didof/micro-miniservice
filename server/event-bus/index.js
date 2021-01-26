const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors())

const events = []

app.post('/events', async (req, res) => {
  const event = req.body;

  events.push(event)
  console.log(events)

  const microservices = [
    'posts-srv-nodeport',
    'moderation-srv',
    'comments-srv',
    'query-srv'
  ]

  try {
    await axios.post(`http://posts-srv:4000/events`, event)
  } catch (error) {
    console.error(`Impossible to contact posts-srv`)
    console.error(error)
  }

  try {
    await axios.post(`http://comments-srv:4001/events`, event)
  } catch (error) {
    console.error(`Impossible to contact comments-srv`)
  }

  try {
    await axios.post(`http://query-srv:4002/events`, event)
  } catch (error) {
    console.error(`Impossible to contact query-srv`)
  }

  try {
    await axios.post(`http://moderation-srv:4003/events`, event)
  } catch (error) {
    console.error(`Impossible to contact moderation-srv`)
  }
  

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
