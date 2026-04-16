[Home](./Home.md) - [Table of Contents](./contents.md) - [Github](https://github.com/caffeine-suite/caffeine-suite)

Related: [Language Comparison](./Language-Comparison.md), [Benefits](./Benefits.md) and [Highlights](./Highlights.md)

While CaffeineScript is an excellent choice for any JavaScript project, there are certain areas where it particularly excels:

* [React with CaffeineScript](./React-with-CaffeineScript.md) and [Declarative Programming](./Declarative-Programming.md)
* [NodeJS with CaffeineScript](./NodeJS-with-CaffeineScript.md) with [90% reduction in module-specific-code](Streamlined-Modules)


### React-Style Example

CaffeineScript

```coffeescript
import &ArtSuite

class Login extends Component

  render: ->
    Element
      TextElement
        text: :username
        size: ww: 1 hch: 1

      TextInputElement
        placeholder: "" enter username here
        size: ww: 1 hch: 1

```

JavaScript
```javascript
let {Component, Element, TextElement, TextInputElement} = require('art-suite');

class Login extends Component {
  render() {
    return Element(
      TextElement({ text: "username", size: { ww: 1, hch: 1 } }),
      TextInputElement({
        placeholder: "enter username here",
        size: { ww: 1, hch: 1 }
      })
    );
  }
}
```
