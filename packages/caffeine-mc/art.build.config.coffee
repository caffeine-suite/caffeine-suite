module.exports =
  package:
    description: "
      Select, configure and extend your to-JavaScript compiler,
      with arbitrary code, on a per file bases from within the file."

    dependencies:
      "babel-bridge":     "^1.10.0"
      "fs-promise":       "^0.5.0"
      colors:             "^1.1.2"
      glob:               "^7.0.3"
      commander:          '^2.9.0'
      prettier:           '^0.18.0'
      cardinal:           '^1.0.0'
      chalk:              "^1.1.3"
      "caffeine-script":  "^0.41.3"

    scripts:
      test: "nn -s;mocha -u tdd --compilers coffee:coffee-script/register"

    bin:
      "caf": "./caf"

  webpack:
    common: target: "node"
    targets:
      index: {}
      "caf-command": {}
