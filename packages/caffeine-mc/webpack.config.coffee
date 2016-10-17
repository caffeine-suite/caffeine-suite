module.exports = (require "art-foundation/configure_webpack")
  entries: "index test"
  dirname: __dirname
  package:
    description: 'Select, configure and extend your to-JavaScript compiler, with arbitrary code, on a per file bases from within the file.'
    dependencies:
      "art-foundation": "git://github.com/Imikimi-LLC/art-foundation.git"
      "babel-bridge":   "git@github.com:shanebdavis/babel-bridge-js.git"
      "fs-promise":     "^0.5.0"
      colors:           "^1.1.2"
      glob:             "^7.0.3"
      commander:        '^2.9.0'

    scripts:
      test: "neptune-namespaces -r test/tests/ -r src/*;mocha -u tdd --compilers coffee:coffee-script/register"

    bin:
      "caffeine-mc": "./caffeine-mc"
