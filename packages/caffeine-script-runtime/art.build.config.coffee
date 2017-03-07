module.exports =
  package:
    description: 'Runtime library for CaffeineScript'
    scripts:
      test:     "mocha -u tdd --compilers coffee:coffee-script/register"

  webpack:
    common: target: "node"
    targets:
      index: {}
