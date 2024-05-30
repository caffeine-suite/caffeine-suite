"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["currentSecond"], [global, require('./StandardImport')], (currentSecond) => {let workingCache, cacheExpiresIn, workingCacheLastResetAt, resetWorkingCache, cacheRead, cacheWrite; workingCache = {}; cacheExpiresIn = 1; workingCacheLastResetAt = currentSecond() - cacheExpiresIn * 10; return {checkWorkingCacheExpiration: function() {return (currentSecond() - workingCacheLastResetAt > cacheExpiresIn) ? resetWorkingCache() : undefined;}, resetWorkingCache: resetWorkingCache = function() {return workingCache = {};}, cacheRead: cacheRead = function(key, p) {let base; return Caf.exists(base = workingCache[key]) && base[p];}, cacheWrite: cacheWrite = function(key, p, v) {let temp; return (((temp = workingCache[key]) != null ? temp : workingCache[key] = {}))[p] = v;}, cacheable: function(key, f) {return (p) => {let temp; return ((temp = cacheRead(key, p)) != null ? temp : cacheWrite(key, p, f(p)));};}};});});
//# sourceMappingURL=WorkingCache.js.map