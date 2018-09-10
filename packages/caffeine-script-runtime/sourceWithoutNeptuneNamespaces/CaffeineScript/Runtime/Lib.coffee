{compactFlatten, isPlainArray, isPlainObject} = require './ArrayCompactFlatten'
require './Global'
global.__definingModule = null

throwImportError = (notFound, importNames, libs) ->
  importFrom = (for lib in libs
    if lib == global
      "global"
    else if lib?
      lib.namespacePath || lib.getName?() || "{#{Object.keys(lib).join ', '}}"
    else
      'null'
  ).join '\n  '

  for line in (new Error).stack.split("\n") when line.match(/^\s/) && !line.match /caffeine-script-runtime/
    importFileName = line.match(/\(([^()]+)/)?[1] || line
    break

  console.warn """
    CaffineScript imports not found:
      #{notFound.join '\n  '}

    importing from:
      #{importFrom}

    source:
      #{importFileName}

    """
  throw new Error "CaffineScript imports not found: #{notFound.join ', '}"

module.exports =
  in:  (a, b) -> a in b
  mod: (a, b) -> a %% b
  div: (a, b) -> a // b
  pow: (a, b) -> a ** b
  existsOr: (a, b) -> a ? b()
  exists: (a) -> a? || undefined

  is: (a, b) ->
    a == b || (a? && b? && a.constructor == b)

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
        (notFound ||= []).push importName

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
      importValue ? (notFound ||= []).push importName

    throwImportError notFound, importNames, libs if notFound?
    toInvoke importValues...

  # CaffeineStyle truth (same as Ruby)

  # returns true if a is anothing other than false, null or undefined
  isTrue: isTrue = (a) -> a? && a != false

  # returns true if a is false, null or undefined
  isFalse: isFalse = (a) -> a == false || !a?

  isFunction:           isFunction = (a) -> typeof a is "function"
  isDirectPrototypeOf:  isDirectPrototypeOf = (o, prototype) -> !isFunction(o) and prototype.constructor == o.constructor

  toString: (a) ->
    if a?
      if isPlainArray a
        a.join ''
      else if isFunction a?.toString
        a.toString()
      else

    else ''

  gt:   (a, b) -> if typeof a == "number" and typeof b == "number" then a > b else a.gt b
  lt:   (a, b) -> if typeof a == "number" and typeof b == "number" then a < b else a.lt b
  lte:  (a, b) -> if typeof a == "number" and typeof b == "number" then a <= b else a.lte b
  gte:  (a, b) -> if typeof a == "number" and typeof b == "number" then a >= b else a.gte b

  add:   (a, b) -> if (typeof a == "number" and typeof b == "number") || (typeof a == "string" and typeof b == "string") then a + b else a.add b
  sub:   (a, b) -> if typeof a == "number" and typeof b == "number" then a - b else a.sub b
  mul:   (a, b) -> if typeof a == "number" and typeof b == "number" then a * b else a.mul b
  div:   (a, b) -> if typeof a == "number" and typeof b == "number" then a / b else a.div b

  ###
  All about getSuper in ES6 land:

    class A {}
    class B extends A {}
    class C extends B {}

    a = new A
    b = new B
    c = new C

    getSuper(B) == A
    getSuper(C) == B

    getSuper(A.prototype) == Object.prototype
    getSuper(B.prototype) == A.prototype
    getSuper(C.prototype) == B.prototype

    getSuper(b) == A.prototype
    getSuper(c) == B.prototype

  prototype map:

  KEY:
    <->
       <-- .constructor
       --> .prototype
    ^  Object.prototypeOf

  MAP:
    A <-> aPrototype

    ^     ^     ^
    |     |     a
    |     |

    B <-> bPrototype

    ^     ^     ^
    |     |     b
    |     |

    C <-> cPrototype

                ^
                c

  Definition of super:

    if instance then prototype's prototype
    else prototype

  ###
  getSuper: getSuper = (o) ->
    throw new Error "getSuper expecting an object" unless (typeof o is "object") || (typeof o is "function")

    _super = Object.getPrototypeOf o

    out = if _super == Function.prototype && o.__super__
      # CoffeeScript class-super
      o.__super__.constructor
    else if isDirectPrototypeOf o, _super
    # Super of an instance is it's prototype's super
      Object.getPrototypeOf _super
    else
      _super

    out

  ###
  IN:
    klass a new class-function object
    init: (klass) -> outKlass

  OUT: if isF outKlass.createWithPostCreate
    outKlass.createWithPostCreate outKlass
  OR
    outKlass (from init)

  EFFECT:
    outKlass.createWithPostCreate?(outKlass) ? outKlass
  ###
  defClass: (klass, init) ->
    init?.call klass, klass, getSuper(klass), getSuper klass.prototype
    klass.createWithPostCreate?(klass) ? klass

  #######################
  # define modules
  #######################
  getModuleBeingDefined: -> global.__definingModule

  ###
  IN:
    defineFunciton ||
  ###
  defMod: (_module, a) ->
    lastModule = global.__definingModule
    global.__definingModule = _module

    result = _module.exports = a()

    global.__definingModule = lastModule

    result

  #######################
  # short forms
  #######################
  i:    _import
  t:    isTrue
  f:    isFalse
  isF:  isFunction
