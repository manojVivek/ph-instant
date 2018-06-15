'use strict';

const config = require('../config');
const db = require('./index');

const COLLECTION_NAME = config.mongodb.postsCollection;

function getLatestPost() {
  return db.getDB()
    .then(_db => {
      console.log('Getting latest post');
      return _db.collection(COLLECTION_NAME)
        .find({}, {_id: 1})
        .sort({_id: -1})
        .limit(1)
        .toArray();
    });
}

function getPostsAfter(id) {
  return db.getDB()
    .then(_db => {
      console.log('posts after id', id);
      return _db.collection(COLLECTION_NAME)
        .find({_id: {$gt: id}})
        .sort({_id: 1})
        .toArray();
    });
}

function savePost(post) {
  return db.getDB()
    .then(_db => _db.collection(COLLECTION_NAME).insert(post));
}

module.exports = {getLatestPost, getPostsAfter, savePost};
