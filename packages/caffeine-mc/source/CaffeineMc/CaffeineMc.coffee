module.exports = [
  require './Metacompiler'
  require './FileCompiler'
  require './ModuleResolver'

  package: _package = require "caffeine-mc/package.json"
  version: _package.version
]