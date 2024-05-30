module.exports = class JavaScript extends require('art-class-system').BaseClass

  @compile: (sourceCode, options) ->
    compiled: js: sourceCode
