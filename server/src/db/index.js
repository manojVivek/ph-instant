'use strict';

const cacheManager = require('cache-manager');
const config = require('../config');
const mongoClient = require('mongodb').MongoClient;

const CACHE = cacheManager.caching({store: 'memory'});

function getMongoClient() {
  return new Promise((resolve, reject) => {
    CACHE.wrap(
      'mongoClient',
      cb => mongoClient.connect(config.mongodb.url, cb),
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
}

function getDB() {
  return new Promise((resolve, reject) => {
    return CACHE.wrap(
      'DB',
      cb => getMongoClient()
        .then(client => {
          if (!client) {
            throw 'Client is null';
          }
          cb(null, client.db(config.mongodb.dbName))
        })
        .catch(err => {
          console.error('Error while getting DB', err);
          cb(err);
        }),
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
}

module.exports = {getDB, getMongoClient};
