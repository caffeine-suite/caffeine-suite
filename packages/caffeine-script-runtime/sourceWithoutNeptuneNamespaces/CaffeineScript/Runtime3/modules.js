// 2019: ArtClassSystem uses global.__definingModule directly
//  TODO: make a tiny NPM for just this file... & standardize ArtClassSystem & CaffeineScript
global.__definingModule = null

module.exports = {
  getModuleBeingDefined: () => global.__definingModule,

  /*
    IN:
      _module: module from currently defined module
      defineFunction
  */
  defModule: (_module, a) => {
    const lastModule = global.__definingModule;
    try {
      global.__definingModule = _module;
      return _module.exports = a();
    } finally {
      global.__definingModule = lastModule;
    }
  }
}