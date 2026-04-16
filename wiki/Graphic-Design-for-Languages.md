I'm a very visual person. My first attempt at writing a programming language was 100% visual - with flow-chart-like diagrams. The reality, though, is nothing is more concise than language for expressing code. However, I still believe strongly in the visual design of a language. We read 100 times more code than we write. Therefore, designing a language to be read is extremely important. One aspect of achieving that, is using the principles of graphic design:

* alignment
* contrast
* proximity
* repetition
* white Space

> source: [
5 Basic Principles Of Graphic Design You Take For Granted Everyday](http://www.makeuseof.com/tag/5-basic-principles-graphic-design-take-granted-everyday/)

### Example


```coffeescript
# JavaScript
#  not aligned: some brackets ({}), colons (:), close-quotes("), some commas (,)
#  inconsistent repetition: trailing comma (,)
fields = {
  mediaAspectRatio:   {type: "short",   index: true  },
  mediaUrl:           {type: "keyword", index: false },
  mediaByteLength:    {type: "integer", index: false },
  mediaFocus:         {type: "object",  index: false },
  mediaColorInfo:     {type: "object",  index: false },
  mediaDimensions:    {type: "object",  index: false }
};

# CoffeeScript - better opportunities for alignment
#  not aligned: colons (:), close-quotes("), commas (,)
fields =
  mediaAspectRatio:   type: "short",    index: true
  mediaUrl:           type: "keyword",  index: false
  mediaByteLength:    type: "integer",  index: false
  mediaFocus:         type: "object",   index: false
  mediaColorInfo:     type: "object",   index: false
  mediaDimensions:    type: "object",   index: false

# CaffeineScript - great opportunities for alignment
#  not aligned: colons (:)
fields =
  mediaAspectRatio:   type: :short      index: true
  mediaUrl:           type: :keyword    index: false
  mediaByteLength:    type: :integer    index: false
  mediaFocus:         type: :object     index: false
  mediaColorInfo:     type: :object     index: false
  mediaDimensions:    type: :object     index: false
```
#### Alignment

Alignment-oriented features enhance both reading and editing. Together with editors that let you do column-based editing (like SublimeText), CaffeineScript's [[optional-commas]] make it trivial to add the extra "index" field to the end of every item in the `fields` object.

#### Contrast and Noise

In a programming language, I think of contrast as being the signal-to-noise ratio. How much information content does a line of code convey for a given set of symbols? JavaScript has a considerably lower signal-to-noise ratio, i.e. a great deal of information redundancy. 

#### Proximity

TODO - thoughts:

* &StreamlinedRequires are so elegant they can often be used directly in the exact place they are used, improving proximity
* Auto-variable-definition tends to favor proximity - no need to place declarations somewhere up above in the source-code

#### Repetition

Inconsistent Repetition Example: From the Alignment example above: In JavaScript, arrays, object literals and function arguments require *inner-commas*. When placed one per line, this means the last line must not have an end-comma. This makes reading slightly harder because it's more information for the brain to process. But more significantly, it makes edits like changing the order of a list significantly more difficult and error-prone.

#### Whitespace

TODO - thoughts:

* CaffeineScript white-space has meaning, but it is designed to be structured, simple and consistent
  * [[Blocks instead of Brackets]]
  * [[Binary Line Starts]]
* Less symbol-noise, means white-space has more gravity - by contrast. Therefore, a few extra spaces can go much further to contrast two parts of code by creating some separation - via whitespace.