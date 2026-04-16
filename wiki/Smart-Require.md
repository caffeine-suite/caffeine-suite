[Home](./Home.md) - [Table of Contents](./contents.md) - [Github](https://github.com/caffeine-suite/caffeine-suite)

Related: [Smart Import](./Smart-Import.md), [Auto Export](./Auto-Export.md), [Modules and CommonJs](./Modules-and-CommonJs.md)

Requiring a lot of things? Having to edit your require statements a lot when you refactor? 

Smart-require reduces syntax, and does a compile-time-search for the file you are requesting to generate the actual require-string. This makes moving files around in your project much easier. 



#### Requiring Local Modules
Example: At compile-time, limited search is performed to find the 'path' module. Let's assume it's in the same directory.
```coffeescript
&Path
# require './path'
```

#### Requiring Node Modules and NPMs
If a local-module is not found, CaffeineScript looks for a Node Module or NPM.

Example: At compile-time, CaffeineScript finds the node-module 'path'.
```coffeescript
&Path
# require 'path'
```

#### Pathing

When requiring node-modules or local modules you can also append a path to require specific files or subdirectories.

```coffeescript
# NOTE: these generated require-strings are based on 
# your directory structure. These are just possible examples
# of what might be generated given the smart-require input.

&ArtStandardLib/Types
# require 'art-standard-lib/Types'

&MyLocalParentDirectory/ASubDir/ASubFile
# require '../../myLocalParentDirectory/a-sub-dir/a_sub_file'
```

#### Case Sensitivity

CaffeineScript uses a case-normalizing algorithm when looking for modules. All words are found in a given name-string and their case is normalized:

* These are all found by: `&FooBarBaz`
  * `"foo_bar_baz"`
  * `"foo-bar-baz"`
  * `"foo.bar.baz"`
  * `"foo bar baz"`
  * `"FooBarBaz"`

For details, see: `ArtStandardLib.getCodeWords`

#### Extensions and Dotted Names

* Basic Idea: extensions are ignored for matching, plus other magic
* Advanced Details
  * When comparing an &String with a file/directory name, first they are both normalized via `ArtStandardLib.getCodeWords` and the normalized &String is looked for **anywhere** in the normalized file-name.
  * If that test passes, we verify that the normalized &String match starts and ends exactly either
    * at the beginning or end of the normalized file name
    * OR where there were dots ('.') in the original file-name.
  * Examples matches:
    * `&FooJs` matches `foo.js`
    * `&FooJs` matches `my.foo.js`
    * `&FooJs` matches `foo.js.bar`
    * `&FooJs` matches `my.foo.js.bar`
  * Example non-matches:
    * `&FooJs` does not match `myFoo.js`
    * `&FooJs` does not match `my-foo.js`
    * `&FooJs` does not match `foo.jsBar`
    * `&FooJs` does not match `foo.js-bar`
    * `&FooJs` does not match `foo.bar.js`

#### Algorithm
* normalized-case comparison
  * The required-string and all tested file-names are normalized before testing for equality.
  * Normalize: `(name) -> require('art-standard-lib').upperCamelCase name`
* auto-requiring local modules
  * Search in the source-file's directory first for matching files or directories.
  * Then search each parent directory in turn, finally stopping at sourceRoot. 
    * The sourceRoot is detected as the directory with either `package.json` or `caffeine-mc.config.caf`
    * COMING SOON: ".git/" will also be used to detect sourceRoot
  * "Search" only searches up the directory structure from the source-file. It does NOT search everywhere in the current package. To reference a peer directory, reference a common root and then append the appropriate pathing: `&CommonRootDirectory/PeerSubDir`.
    * I have an idea to enable full local-module searching, but I want a concrete use-case where it's a good idea. Please write me!
* auto-requiring node_modules
  * If a module is not found locally, look for a node-module/npm:
  * Given: `$MyNpm`
    * try `require 'my-npm'` 
    * try `require 'MyNpm'`
    * Otherwise, the compiler reports an error.
  * Cautions:
    * This assumes npm modules are dash-case or exactly your specified-case. It does not do a full normalized-case comparison like in the local-module case. Note, you can always use a manual-require: `require "my_module"`
    * When requiring an npm module with a path such as: `$MyNpm/Foo`, `$MyNpm` must resolve without the "/Foo" path. CaffeineScript resolves the root module first and then uses its more powerful file-pathing algorithm with full normalized-case-comparison. It compares normalized names just like auto-local-module requiring above. If your npm doesn't resolve without a path, try adding an empty `index.js` file in the root.
    * Ideally, both these could be fixed with a custom node_module resolver. Anyone want to help with that?
