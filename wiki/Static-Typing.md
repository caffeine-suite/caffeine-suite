Related: [[Dynamic Typing]], [[One Size Fits All Fallacy]]

# CaffeineScript and Dynamic/Static Typing

CaffeineScript embraces JavaScript's dynamic typing roots. It does not have any static typing support. However, CaffeineScript is designed to go beyond a one-size-fits-all language. It's designed to be a platform.

Static typing fan? CaffeineScript fan? Let's talk...

# Dynamic vs Static Typing

Static typing's theoretical benefits:

* API documentation
* error detection
* performance

Dynamic typing's theoretical benefits:

* More expressive
* Less code
* More reusable code

# The TypeScript Tax

This article closely aligns with my observations about static-typing: [The TypeScriptTax](https://medium.com/javascript-scene/the-typescript-tax-132ff4cb175b)

There is so much good in that article, but one of the most important, and most object takeaways is static typing can catch *at most 20% of all errors* for the average project. Eric comes to that conclusion by analyzing a study which broke down bug-types across many open source projects and then classifying them by ones that static typing can find and ones it cannot. 

# My Interests (aka Shane)

I am interested in type-declarations for:

* documentation / intellisense-like-featuers
* performance
* runtime-validation
  * as long as the system's validation expressiveness is Turing-complete
  * i.e. validations can be expressed in arbitrary CaffeineScript code

I'm not interested in:

* static type analysis / validation

# SBD's Opinion

I don't believe in one-size-fits-all anything. CaffeineScript is for people who love dynamic typing. For different people with different brains, static typing may work great. It's about brain-tool-fit. To all the static-typing fans, cheers! If you like CaffeineScript except you want TypeScript or other typing support, let me know. Maybe we can do it.

Below are my personal opinions on static typing. This is just how my brain works. I recognize and respect other peoples' experiences with static typing.

### Static Typing Doesn't Prevent Anything but Trivial Bugs

Static typing has never prevented a bug for me. Or, more concretely, since I've switched from C++ to first Ruby and then JavaScript/CoffeeScript, I've never had a bug in a dynamic language that static typing would have caught. 'Never' may be slightly too strong, but I pay close attention to the patterns of my bugs, and I would have noted if a bug would have been caught by static typing. I just don't seem to make the kinds of bugs that static typing catches. Is it me, or are the claims of static-typing for bug prevention overblown? I don't know.

For me, what I do find is when I'm using statically typed languages (have used a ton of C++, a decent amount of Objective-C and some Java), I waste an inordinate amount of time fighting with their overly restrictive type systems.

One of the biggest problems with static typing is it is *always* insufficient. There is always some sort of type-concept I want to represent that the language cannot capture. Instead, I start to shoehorn my solutions to fit the language. Over time it corrodes my thinking and prevents me from seeing superior solutions to problems. The problem is static-type-systems cannot perform Turing-complete, arbitrary validity checks.

> Some language's type systems are 'Turing-complete' in the distorted sense that they can perform arbitrary computation, but that's neither useful nor the same thing as saying you can provide an arbitrary function to test for type validity.

Imagine the following pseudo-code-type-system:

```coffeescript
def type::email
  validate: (str) -> /[0-9a-z]+@[0-9a-z]\.[a-z]+/.test str

sendPasswordReset: (email::userEmail, string::resetKey) -> ...
```

It simply doesn't make sense to have a static-type-system be that powerful because you cannot, in general, statically analyze such types. Therefor I find static type analysis uninteresting; it can only catch the most trivial bugs. All the interesting stuff requires runtime checks and testing. It's a bit like differential equations: only trivial differential equations can be solved symbolically. All the interesting stuff requires numerical methods (read: 'runtime checks').

Unsurprisingly, I like runtime checking. Since the language itself is Turing-complete, I am free to express any possible checking. Further, I find runtime checking isn't generally a performance problem since, if need be, it can easily be disabled when running in production.

### Static Typing Makes Testing Harder

I'm also, as you might guess, a big believer in [TDD](https://en.wikipedia.org/wiki/Test-driven_development) (Test Driven Development). Even in static-land, you need to write tests. Even if static-typing does capture bugs as some claim, it's a tiny faction of the kinds of things you need to test for. If you have a good process, your tests will catch your bugs and communicate your intentions way better than static-typing can. Static typing languages are also notoriously hard to write test-suites for. All together, for me, it's a strike-out for statically-typed languages.

#### My Testing Style, FYI, Isn't Strict TDD nor Has 100% Coverage

Personally, I write tests and code in alternating order, not necessarily tests-first. What's important is that the testing framework keeps pace with my code and has high, but not necessarily 100% coverage. Getting that last few percent of coverage can be very time-costly and it doesn't actually guarantee I've tested everything. Therefor, 100% coverage isn't cost-effective, and can actually be dangerous: high cost, little value, and a false sense of security, much like static typing actually.

* Great blog post on the cost of testing: [The Tragedy of 100% Code Coverage](http://labs.ig.com/code-coverage-100-percent-tragedy)

### Philosophy of Failure

When should a program fail? At first glance this seems trivial, but upon deeper reflection, it's a complex question. I like to think of this in reverse. A program failed if its output is invalid. This could be for many reasons. It could be due to bugs, it could be due to bad input (and a failure to detect it), or it could even be because of cosmic rays.

If a program detects that it cannot produce valid output, what should it do? The general answer is an 'error channel' should be defined as one form of valid output. Then the program can report the error in a well-formatted way, thus producing valid output.

Now, consider a program that always reports valid errors, even when it receives valid inputs. Clearly this program is a failure, but it doesn't fit in our paradigm so far: it is producing valid output. We need to add the concept of "a program only succeeds if it produces input-specific-valid-output for a specific, valid input."

Next, consider a program that can produce valid output, but it is unsure if the output will be invalid. It therefore returns a well-formatted-error, just to be safe. I consider this a failure. The program's validation-code failed to correctly detect if it could output valid output.

#### Program Failure Done Right

I have come up with the following criteria for 'ideal' program failure modes:

* Programs should only report failure if they cannot succeed.
* Programs should report failure early as possible *as long as it is certain they cannot succeed*.

#### Program Failure and Static Typing

This is the fundamental problem with static type checkers. They *must* reject some valid programs, "to be safe." There is no such thing as a complete theorem prover. Gödel's incompleteness theorem states that *within any formal logic system there exists statements which cannot be determined to be true or false from within the system*.

### But Dynamic Typing Doesn't Scale, Right?

Projects at scale need structure. Dynamically typed languages don't enforce a structure and therefore big projects can run amok. However, just because the language doesn't enforce a structure doesn't mean you can't use structure. I'm currently maintaining two massive, fully dynamically typed projects: The [ArtSuite](https://github.com/imikimi/art-suite/wiki), and all the libraries to build CaffeineScript itself. With classes, modules, directory structures, Node Project Manager NPMs, and tools like [Neptune Namespaces](https://github.com/imikimi/neptune-namespaces), I actually find large dynamic projects easier to manage than previous large static projects I've maintained.

One of the huge advantages is dynamic languages are much easier to refactor, for me anyway. As such, it's much easier to pay down code-debt and keep the overall project running smoothly.

### Type Declarations for Documentation and Performance

Given all that, you may be surprised that I do think there are useful roles for type declarations. Static type-checking just isn't one of them. One useful role is to provide structured documentation, that smart editors and IDEs can use to give contextually relevant information. Another is type declarations can provide the type-hints optimizers need to dramatically improve performance. I have thoughts on how to evolve CaffeineScript, down the road, to use static typing for both purposes.