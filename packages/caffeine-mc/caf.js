
if (true) { // use build
  require('./build/caf-command.js');
} else { // for dev, use uncompiled files
  require('coffee-script/register');
  require('./caf-command');
}
