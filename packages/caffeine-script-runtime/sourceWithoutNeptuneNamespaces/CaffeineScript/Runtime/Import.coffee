{compactFlatten} = require './ArrayCompactFlatten'

throwImportErrors = isNode = require 'detect-node'

throwImportError = (notFound, importNames, libs) ->
  importFrom = (for lib in libs
    if lib == global
      "global"
    else if lib?
      lib.namespacePath || lib.getName?() || "{#{Object.keys(lib).join ', '}}"
    else
      'null'
  ).join '\n  '

  importFileName = null
  for line in (stack = (new Error).stack).split("\n") when !line.match /caffeine-script-runtime/
    if importFileName ?= line.match(/(\/[^\/]+)+\.(caf|js)\b/i)?[0]
      break

  console.warn """
    CaffieneScript imports not found:
      #{notFound.join '\n  '}

    importing from:
      #{importFrom}

    source:
      #{importFileName ? stack}

    """

  if throwImportErrors
    throw new Error "CaffieneScript imports not found: #{notFound.join ', '}"

module.exports =

  ###
  Implements the 'import' function.

  IN:
    importNames: array of strings of identifiers to import
    libs: array of objects to import from, first has highest priority.

  OUT: and object with one property per importName
  ###
  import: _import = (importNames, libs) ->
    out = {}
    notFound = null
    libs = compactFlatten libs
    for importName in importNames
      for lib in libs by -1
        if (v = lib[importName])?
          out[importName] = v
          break
      unless out[importName]?
        out[importName] = new Error "CaffieneScript import not found: #{importName}"
        (notFound ?= []).push importName

    throwImportError notFound, importNames, libs if notFound?
    out



  ###
  IN:
    importNames: array of strings
    libs: array of objects to import from, with arbitrary subarray nesting
    toInvoke: function

  EFFECT:
    for each import-name, libs are searched in reverse order for a value with that name.
      if no value is found, an error is down with and information is provided.

    toInvoke is called with each of the values found in order as arugments.
    the value form toInvoke is returned

  EXAMPLE:
    importInvoke(["a", "b"], [a:1, b:2], toInvoke)
    EFFECT: return toInvoke 1, 2
  ###
  importInvoke: (importNames, libs, toInvoke) ->
    notFound = null
    libs = compactFlatten libs
    importValues = for importName in importNames
      importValue = null
      for lib in libs by -1
        if (v = lib[importName])?
          importValue = v
          break
      if importValue?
        importValue
      else
        (notFound ||= []).push importName
        new Error "CaffieneScript import not found: #{importName}"

    throwImportError notFound, importNames, libs if notFound?
    toInvoke importValues...

  # CaffeineStyle truth (same as Ruby)

  # returns true if a is anothing other than false, null or undefined
  isTrue: isTrue = (a) -> a? && a != false

  # returns true if a is false, null or undefined
  isFalse: isFalse = (a) -> a == false || !a?

  isFunction:           isFunction = (a) -> typeof a is "function"
  isDirectPrototypeOf:  isDirectPrototypeOf = (o, prototype) -> !isFunction(o) and prototype.constructor == o.constructor

  #######################
  # short forms
  #######################
  i:    _import
