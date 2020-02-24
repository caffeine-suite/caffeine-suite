if (require('./use-build')) {
  module.exports = require("./build");
} else {
  console.log("caffeine-mc: dev-mode (not using caffeine-mc/build)");
  require('coffee-script/register');
  module.exports = require("./source");
}
