[Home](./Home.md) - [Table of Contents](./contents.md) - [Github](https://github.com/caffeine-suite/caffeine-suite)

Related: [Auto Import](./Auto-Import.md), [Auto Require](./Auto-Require.md), [Modules and CommonJs](./Modules-and-CommonJs.md)

The return value of the file is the exports for the module. As with any other statements-block, the last statement of the file is its return value.


### Example
```coffeescript
# CaffeineScript
class Foo extends &MyBaseClass
  bar: -> "foo bar"
```

```javascript
// JavaScript
module.exports = class Foo extends require('./MyBaseClass') {
  bar() {return "foo bar";}
};
```
