const config = {
  mongodb: {
    dbName: 'ph_instant',
    url: 'mongodb://127.0.0.1:27017',
    postsCollection: 'posts',
  },
  producthunt: {
    clientId: 'PH_CLIENT_ID',
    clientSecret: 'PH_CLIENT_SECRET',
  },
};

module.exports = config;
