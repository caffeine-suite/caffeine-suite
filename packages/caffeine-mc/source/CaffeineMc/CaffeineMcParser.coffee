{
  present, isFunction, log, isString, lowerCamelCase, upperCamelCase, merge
} = require 'art-standard-lib'
BabelBridge = require 'babel-bridge'

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
