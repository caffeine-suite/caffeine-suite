// Generated by CoffeeScript 1.12.7
(function() {
  var getSuper, isDirectPrototypeOf, isFunction, isPlainArray, ref,
    modulo = function(a, b) { return (+a % (b = +b) + b) % b; };

  require('./Global');

  ref = require('./Types'), isPlainArray = ref.isPlainArray, isFunction = ref.isFunction;

  global.__definingModule = null;

  isDirectPrototypeOf = function(o, prototype) {
    return !isFunction(o) && prototype.constructor === o.constructor;
  };

  module.exports = {
    "in": function(a, b) {
      if (b != null) {
        return 0 <= b.indexOf(a);
      } else {
        return false;
      }
    },
    mod: function(a, b) {
      return modulo(a, b);
    },
    div: function(a, b) {
      return Math.floor(a / b);
    },
    pow: function(a, b) {
      return Math.pow(a, b);
    },
    existsOr: function(a, b) {
      return a != null ? a : b();
    },
    exists: function(a) {
      return (a != null) || void 0;
    },

    /*
      TOFIX (in Console): this fails for built-in types in CaffeineMC's Console,
        and if you define a function identical to this, within the console,
        it WILL work. Why?
          Because there are two JS environments running, and atomic values
          are passed as atomics and their "Type" changes - to an identical
          copy of the same type, but !== to the type you passed in.
    
        e.g.: this returns false in the console: "true is Boolean"
        Solution: stop using Node's stupid interactive console, or
          can we ensure that ALL code is evaled in the same environment?
      NOTE - this also will fail, differently, across iFrames in the browser- since they
        have different javascript environments.
     */
    is: function(a, b) {
      return a === b || ((a != null) && (b != null) && a.constructor === b);
    },
    toString: function(a) {
      if (a != null) {
        if (isPlainArray(a)) {
          return a.join('');
        } else if (isFunction(a != null ? a.toString : void 0)) {
          return a.toString();
        } else {

        }
      } else {
        return '';
      }
    },

    /*
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
     */
    getSuper: getSuper = function(o) {
      var _super, out;
      if (!((typeof o === "object") || (typeof o === "function"))) {
        throw new Error("getSuper expecting an object");
      }
      _super = Object.getPrototypeOf(o);
      out = _super === Function.prototype && o.__super__ ? o.__super__.constructor : isDirectPrototypeOf(o, _super) ? Object.getPrototypeOf(_super) : _super;
      return out;
    },

    /*
      IN:
        klass a new class-function object
        init: (klass) -> outKlass
    
      OUT: if isF outKlass.createWithPostCreate
        outKlass.createWithPostCreate outKlass
      OR
        outKlass (from init)
    
      EFFECT:
        outKlass.createWithPostCreate?(outKlass) ? outKlass
     */
    defClass: function(klass, init) {
      var ref1;
      if (init != null) {
        init.call(klass, klass, getSuper(klass), getSuper(klass.prototype));
      }
      return (ref1 = typeof klass.createWithPostCreate === "function" ? klass.createWithPostCreate(klass) : void 0) != null ? ref1 : klass;
    },
    getModuleBeingDefined: function() {
      return global.__definingModule;
    },

    /*
      IN:
        _module: module form currently defined module
        defineFunction
    
      EFFECT
        global.__definingModule is set to the currently loading module
          (recursive module loading is handled properly)
    
          This is used by ArtObjectModel to automatically configure
          hot-reloading if available.
    
        module.exports.__definingModule is set to the module
          This helps us detect and debug circular dependencies.
     */
    defMod: function(_module, a) {
      var lastModule, result;
      lastModule = global.__definingModule;
      global.__definingModule = _module;
      _module.exports.__definingModule = _module;
      result = _module.exports = a();
      global.__definingModule = lastModule;
      return result;
    },
    isFunction: isFunction,
    isF: isFunction
  };

}).call(this);
