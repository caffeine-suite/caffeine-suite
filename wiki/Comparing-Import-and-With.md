[Home](./Home.md) - [Table of Contents](./contents.md) - [Github](https://github.com/caffeine-suite/caffeine-suite)

#### JavaScript's `with`

My concept of `import` is similar to JavaScript's built-in `with`. I know `with` is maligned, but I think `with` can be rehabilitated with slightly different semantics:

* CaffeineScript's `import` is resolved be implemented as a load-time cost, not a runtime cost. Essentially, there should be little or no practical performance hit. If needed, it could potentially be computed at compile-time.

Pros, cons, thoughts:
* Since you can always view the generated javascript, CaffeineScript's `import` should be easier to understand.
* `import` best practices
  * `import` should only be used at load time
  * `import` should only be used with plain objects

##### `import` vs `with`

* [arguments against `with`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/with)
* Most of these 'bad' examples are just bad uses of `with`. As with all powerful tools, including most programming constructs, you can shoot yourself in your foot if you use them incorrectly.
* Not-future-proof is the most interesting example in the link above.
  * Even if you use the `import` best-practices from above you could still be susceptible to breakage due to language or library changes.
  * However, good code should never access globals - the values set on window/self/global - except for those defined by the EcmaScript standard.
  * Such code, using `import`, is only susceptible to breakage if the EcmaScript standard or a library *removes* a property or completely redefines it.
  * In either case, code without `import` would be just as susceptible to future breakage
