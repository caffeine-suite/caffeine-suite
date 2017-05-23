module.exports = [
  require './Metacompiler'
  require './FileCompiler'
  require './ModuleResolver'
  require './Tools'
  require './Run'
  require './Register'
  version: (require '../../package.json').version
]