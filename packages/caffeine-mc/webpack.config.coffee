module.exports = (require "art-foundation/configure_webpack")
  entries: "caffeine-mc caf-command"
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
    "caffeine-mc"
    "commander"
    "glob"
  ]

  dirname: __dirname
  package:
    description: 'Select, configure and extend your to-JavaScript compiler, with arbitrary code, on a per file bases from within the file.'
    dependencies:
      "art-foundation": "git://github.com/imikimi/art-foundation.git"
      "babel-bridge":   "git@github.com:shanebdavis/babel-bridge-js.git"
      "fs-promise":     "^0.5.0"
      colors:           "^1.1.2"
      glob:             "^7.0.3"
      commander:        '^2.9.0'
      prettier:         '^0.18.0'

    scripts:
      test: "nn -s;mocha -u tdd --compilers coffee:coffee-script/register"

    bin:
      "caf": "./caf"
