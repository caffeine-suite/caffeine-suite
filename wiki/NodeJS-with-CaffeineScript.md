As part of my combined ArtSuite and Caffeine ecosystems, I'm maintaining an ever-growing list of NPMs. As-of May 2017, there are 43! The only way one person can stay on top of this much code is by doing more with less. CaffeineScript is key to my ongoing strategy of extending my reach as a programmer.

If you are interested in streamlining your npm-code, see also: [neptune-namespaces](https://www.npmjs.com/package/neptune-namespaces)

### Example: 'random-key' NPM

Take this simple, well-written NPM library:

* [random-key source](https://github.com/yanxi-me/nodejs-random-key/blob/master/index.js)

Compare in CaffeineScript vs the original source:

```coffeescript
import &crypto

cryptoIntRand = (max) ->
  [low, high] = randomBytes 2
  256 * high + low
  % max

digits = :0123456789
base62 = :0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz
base30 = :0123456789ABCDFHKLMNPQRSTUVWXYZ  # 1-9, A-Z exclude(E, G, I, J, O) for human read

generate: generate = (length = 16, chars = base62) ->
  key = ''
  charsLen = chars.length
  while key.length < length
    key += chars[cryptoIntRand charsLen]

generateDigits: (length = 16) -> generate length, digits
generateBase30: (length = 16) -> generate length, base30
```

versus
```javascript
var crypto = require("crypto");

var rn = function(max) {
  var rnBytes = crypto.randomBytes(2);
  var randomNum = rnBytes.readUInt8(0) * 256 + rnBytes.readUInt8(1);
  return randomNum % max;
}

var digits = '0123456789'
var base62 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'
var base30 = '0123456789ABCDFHKLMNPQRSTUVWXYZ'  // 1-9, A-Z exclude(E, G, I, J, O) for human read

exports.generate = function(len, chars) {
  len = len || 16;
  chars = chars || base62;
  var key = '';
  var charsLen = chars.length;
  for (var i=0; i<len; i++) {
    key += chars[rn(charsLen)];
  }
  return key;
};

exports.generateDigits = function(len) {
  len = len || 16;
  return exports.generate(len, digits)
};

exports.generateBase30 = function(len) {
  len = len || 16;
  return exports.generate(len, base30)
}
```