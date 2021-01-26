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

  try {
    await axios.post(`http://posts-srv-nodeport:4000/events`, event)
  } catch (error) {
    console.error(`Impossible to contact posts-srv-nodeport`)
    console.error(error)
  }
  // try {
  //   await axios.post(`http://localhost:4001/events`, event)
  // } catch (error) {
  //   console.error(`Impossible to contact 4001`)
  // }
  // try {
  //   await axios.post(`http://localhost:4002/events`, event)
  // } catch (error) {
  //   console.error(`Impossible to contact 4002`)
  // }
  // try {
  //   await axios.post(`http://localhost:4003/events`, event)
  // } catch (error) {
  //   console.error(`Impossible to contact 4003`)
  // }
  

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
