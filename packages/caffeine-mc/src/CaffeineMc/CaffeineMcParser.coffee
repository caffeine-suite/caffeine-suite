Foundation = require "art-foundation"
BabelBridge = require 'babel-bridge'

{present, isFunction, log, isString, BaseObject, lowerCamelCase, upperCamelCase, merge} = Foundation

module.exports = class CaffeineMcParser extends BabelBridge.Parser

  @rule
    root: "!oneLinerWithoutColon meta? toEof"
  ,
    getter:
      compilerName: -> @meta?.compilerName?.text
      metaCode:     -> @meta?.metaCode?.text
      code:         -> @toEof?.text || ""

  @rule
    meta: [
      "'|' compilerName /\: */ metaCode:toEol end"
      "'|' / +/ metaCode:toEol end"
      "'|' compilerName /\: */? metaCode:block end"
      "'|' metaCode:block end"
      "'|' compilerName end"
      "'|'"
    ]
    oneLinerWithoutColon: "'|' compilerName / *[^:\n]/"
    compilerName: /[^:\s]+/i
    toEof: /(.|\n)*$/
    toEol: /\S[^\n]*/
    end: /\n|$/
    block: BabelBridge.Extensions.IndentBlocks.getPropsToSubparseBlock rule: "toEof"
