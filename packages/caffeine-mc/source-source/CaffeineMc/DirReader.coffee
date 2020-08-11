{
  defineModule, peek, Promise, dashCase, upperCamelCase,
  ErrorWithInfo, log, merge, present, find, each, w
  mergeInto
  currentSecond
} = require 'art-standard-lib'
Path = require 'path'

{statSync, readdirSync} = require 'fs-extra'

{
  cacheable
} = require './WorkingCache'

module.exports =
  isDir:          cacheable "isDir"  , (p) -> statSync(p).isDirectory()
  read:           cacheable "read"   , readdirSync
  resolve:        cacheable "resolve", Path.resolve
