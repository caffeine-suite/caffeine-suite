[Home](./Home.md) - [Table of Contents](./contents.md) - [Github](https://github.com/caffeine-suite/caffeine-suite)

See also: [Destructuring](./Destructuring.md) and [Restructuring](./Restructuring.md)

The opposite of [destructuring](./Destructuring.md), object-structuring allows you to create objects with further-reduced syntax. Inside an *explicit* object-literal, you can omit keys for your values and have them automatically generated for you:

```coffeescript
a = {} # < explicit object literal block
  user
  post.caption
  @count
  info: "normal, explicit keys work here, too"
```

```javascript
// Javascript ES6 (EcmaScript6)
a = {
  user,
  caption: post.caption,
  count:   this.count,
  info:    "normal, explicit keys work here, too"
};
```


### Implicit Key Rules

If it is a pathed reference, the final identifier is used as the key.

* Effectively, "@" and everything before the last '.' in a dot-chain are removed when generating the key.
* This is the inverse of pathing with [Destructuring](./Destructuring.md).

Examples:
```coffeescript
{} @foo     # foo: @foo
{} foo.bar  # bar: foo.bar
```

### Note: Doesn't Work with Implicit Objects

```coffeescript
a = # < implicit
  info: 123
  user
  post.caption
  @count
  foo: 123
```

```javascript
a = [{info: 123}, user, post.caption, @count, {foo: 123}];
```

# Structuring with Destructuring

This provides a built-in way to 'select' props from one object, creating a new one, without listing the property names more than once:

```coffeescript
a = {} userRecord extract name, address
b = {} myPoint extract x, y

# OR
a = {} {name, address} = userRecord
b = {} {x, y} = myPoint
```

```javascript
let a, b,
  {name, address} = userRecord,
  {x, y} = myPoint;

a = {name, address};
b = {x, y};
```