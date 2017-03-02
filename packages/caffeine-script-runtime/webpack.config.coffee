module.exports = (require "art-foundation/configure_webpack")
  entries: "caffeine-script-runtime"
  target: "node"
  output: libraryTarget: "commonjs2"
  externals: [
    "colors"
    "detect-node"
    "bluebird/js/browser/bluebird.core"
    "coffee-script"
    "prettier"
    "any-promise"
    "fs-extra"
    "graceful-fs"
    "fs-promise"
  ]

  package:
    description: 'Runtime library for CaffeineScript'
    scripts:
      test:     "mocha -u tdd --compilers coffee:coffee-script/register"
