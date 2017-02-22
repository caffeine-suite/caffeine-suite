module.exports = (require "art-foundation/configure_webpack")
  entries: "index"
  package:
    description: 'Runtime library for CaffeineScript'
    scripts:
      test:     "mocha -u tdd --compilers coffee:coffee-script/register"
