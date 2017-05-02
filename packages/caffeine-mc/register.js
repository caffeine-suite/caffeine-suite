
if (true) { // load packed-js
  module.exports = require('./index').register();
} else {
  require('coffee-script/register');
  module.exports = require('./register.coffee');
}

