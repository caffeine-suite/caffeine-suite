Related: [[Language Comparison]], [[Benefits]] and [[Highlights]]

While CaffeineScript is an excellent choice for any JavaScript project, there are certain areas where it particularly excels:

* [[React with CaffeineScript]] and [[Declarative Programming]]
* [[NodeJS with CaffeineScript]] with [90% reduction in module-specific-code](Streamlined-Modules)

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
