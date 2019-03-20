{compactFlatten, isPlainArray, isPlainObject} = require './ArrayCompactFlatten'
require './Global'
global.__definingModule = null

module.exports =
  in:  (a, b) -> 0 <= b.indexOf a
  mod: (a, b) -> a %% b
  div: (a, b) -> a // b
  pow: (a, b) -> a ** b
  existsOr: (a, b) -> a ? b()
  exists: (a) -> a? || undefined

  # NOTE - this failes for built-in types in CaffeineMC's Console,
  # and if you define a funciton identical to this, within the console,
  # it WILL work. Why?
  #   Because there are two JS environments running, and atomic values
  #   are passed as atomics and their "Type" changes - to an identical
  #   copy of the same type, but !== to the type you passed in.
  # e.g.: this returns false in the console: "true is Boolean"
  # Solution: stop using Node's stupid interactive console, or
  #   can we ensure that ALL code is evaled in the same environment?
  # NOTE - this also will fail, differently, across iFrames in the browser- since they
  #   have different javascript environments.
  is: (a, b) ->
    a == b || (a? && b? && a.constructor == b)

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
  t:    isTrue
  f:    isFalse
  isF:  isFunction
