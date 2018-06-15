'use strict';

const express = require('express');
const phUtils = require('./ph-utils');
const posts = require('./db/posts');

const app = express();

setInterval(phUtils.refreshProducts, 10000);

app.get('/alerts/:id', (req, res) => {
  const id = req.params.id ? parseInt(req.params.id, 10) : 0;
  console.log('Checking alerts after id', id);
  posts.getPostsAfter(id)
    .then(posts => posts.map(post => {
      console.log('Mapping', post);
      const {id, name, tagline} = post;
      const url = post.discussion_url;
      const img = post.thumbnail.image_url.split('?')[0];
      return {id, name, tagline, img, url};
    }))
    .then(posts => res.json(posts))
    .catch(err => res.status(500).json({err}));
});

app.listen(3000, () => console.log('Listening on port 3000'));


