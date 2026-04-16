[Home](./Home.md) - [Table of Contents](./contents.md) - [Github](https://github.com/caffeine-suite/caffeine-suite)

Related: [Semantic Changes](./Semantic-Changes.md)


### Caffeine Truth (coming soon)

In CaffeineScript, truth is simple and useful:

* FALSE: `false`, `undefined` and `null`
* TRUE: everything else

If you are familiar with the Ruby programming language, CaffeineTruth is basically RubyTruth.

### Where It Applies

```coffeescript
# In all the following examples, 
#  a is tested with: Caf.true(a)

if a...
unless a...
while a...
until a...

a && ... 
a || ... 
!a
```