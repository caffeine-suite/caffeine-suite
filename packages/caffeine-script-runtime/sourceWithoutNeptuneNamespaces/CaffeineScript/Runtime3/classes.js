const {isFunction} = require('./types');

const isDirectPrototypeOf = (o, prototype) => !isFunction(o) && prototype.constructor === o.constructor

const getSuper = (o) => {
  if ((typeof o !== "object") && (typeof o !== "function"))
    throw new Error("expecting an object");

  const _super = Object.getPrototypeOf(o);

  if (_super === Function.prototype && o.__super__)
    // CoffeeScript class-super
    return o.__super__.constructor;
  else if (isDirectPrototypeOf(o, _super))
    //  Super of an instance is its prototype's super
    return Object.getPrototypeOf(_super);
  else
    return _super;
}

module.exports = {
  getSuper,

  defClass: (klass, init) => {
    if (init != null)
      init.call(klass, klass, getSuper(klass), getSuper(klass.prototype));

    if (typeof klass.createWithPostCreate === "function")
      return klass.createWithPostCreate(klass);
    return klass;
  }
}
