'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/nodedenver-dev'
  },

  mysql: {
  
  },

  redis: {

  },

  yelp: {
    consumer_key: 'm1TvMHSF7PoLTIwV85NxbA', 
    consumer_secret: '6u8JIKkDxYrVWVXmBsLSYPOnb5s',
    token: '_awxcfRsxMVasHHgxZCjc9w8E_9ytdQe',
    token_secret: 'g10FIqW_KS8vjIx9dCotKWSRXHU' 
  },

  seedDB: true
};
