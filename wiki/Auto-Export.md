Related: [[Auto Import]], [[Auto Require]], [[Modules and CommonJs]]

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
