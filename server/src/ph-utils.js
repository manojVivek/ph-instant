'use strict';

const config = require('./config');
const posts = require('./db/posts');
const productHuntAPI = require('producthunt');

const productHunt = new productHuntAPI({
  client_id: config.producthunt.clientId,
  client_secret: config.producthunt.clientSecret,
  grant_type: 'client_credentials',
});
let isRunning = false;

function refreshProducts() {
  if (isRunning) {
    console.log('Resfresher already in progress');
    return;
  }
  isRunning = true;
  console.log('Starting refresher');
  return posts.getLatestPost()
    .then(([latestPost]) => {
      let lastId = 128970;
      if (latestPost && latestPost._id) {
        lastId = latestPost._id;
      }
      return fetchAndSaveAllPostsAfterId(lastId);
    })
    .then(() => isRunning = false)
    .catch((err) => {
      isRunning = false;
      console.error('Error in refresher', err);
    });
}

function fetchAndSaveAllPostsAfterId(lastId) {
  return getPHPost(++lastId);
}

function getPHPost(id) {
  console.log('Fetching product id:', id);
  return new Promise((resolve, reject) => {
    productHunt.posts.show({id}, function (err, res) {
      if (err) {
        console.error('Error getting post', id, err);
        return reject(err);
      }
      if (res.error) {
        return resolve();
      }
      const post = JSON.parse(res.toJSON().body).post;
      if (!post) {
        return resolve();
      }
      post._id = post.id;
      posts.savePost(post)
        .then((res) => {
          getPHPost(++id)
            .then(resolve)
            .catch(reject);
        })
        .catch(err => {
          console.error('Error saving new post', id, err);
          reject(err);
        });
    });
  });
}

module.exports = {refreshProducts};
