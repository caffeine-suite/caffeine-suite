module.exports = [
  require './Metacompiler'
  require './FileCompiler'

  package: _package = require "caffeine-mc/package.json"
  version: _package.version
]