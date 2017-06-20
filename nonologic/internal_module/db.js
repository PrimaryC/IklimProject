var mongoose = require('mongoose');
module.exports.init = function() {
  function connect() {
    mongoose.connect('localhost:27017', function(err) {
      console.log('mongodb connected');
      if (err) {
        console.error('mongodb connection error', err);
      }
    });
  }
  connect();
  mongoose.connection.on('disconnected', connect);
  require('./user.js'); // user.js는 나중에 만듭니다.
};