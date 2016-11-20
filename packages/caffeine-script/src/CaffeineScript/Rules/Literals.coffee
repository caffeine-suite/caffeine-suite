{a, m, w, log, formattedInspect, escapeJavascriptString} = require "art-foundation"

module.exports = ->
  @rule
    literal: w "boolLiteral numberLiteral stringLiteral"

  @rule
    boolLiteral:   w "true false"
    numberLiteral: pattern: /-?[0-9]+/

    true:   "/(true|yes|on)(?![a-zA-Z0-9]+)/"
    false:  "/(false|no|off)(?![a-zA-Z0-9]+)/"
  ,
    stnFactory: "SimpleLiteralStn"
    stnProps: ->
      value: switch v = @toString()
        when "true", "yes", "on" then "true"
        when "false", "no", "off" then "false"
        else v
