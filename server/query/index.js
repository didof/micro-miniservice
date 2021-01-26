const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios')

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = ({ type, data }) => {
  console.log('Processing event: ', type)

  if (type === 'PostCreated') {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === 'CommentUpdated') {
    const { postId, id, content, status } = data
    const post = posts[postId]
    const comment = post.comments.find(comment => {
      return comment.id === id
    })
    comment.status = status
  }
}

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {

  handleEvent(req.body)

  res.send({ ok: true });
});

app.listen(4002, async () => {
  console.log('Listening on 4002');

  try {
    console.log('[query] sync with event-bus.')
    const res = await axios.get('http://event-bus-srv:4005/events')
    res.data.forEach(event => handleEvent(event))
  } catch (error) {
    console.error('[query] Impossible retrieve events history.')
  }
});
