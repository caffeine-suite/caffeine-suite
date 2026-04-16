# Install

```bash
npm install caffeine-script
```
# Use

### Command Line & Interactive Shell (REPL - Read-Evaluate-Print-Loop)

Once you install, you can compile and execute .caf files. The command-line arguments for `caf` are patterned after CoffeeScript's `coffee`, so they should feel familiar.

```bash
# list all options
> caf --help

# start interactive shell
> caf

# run myFile.caf
> caf myFile
```

### Node.js
In order to use CaffeineScript files directly in node, first:

```javascript
require('caffeine-mc/register');
```

And then you can require any `.caf` file just like you would any `.js` file. Note that `.js` files with the same base-name have priority when in the same directory.

### Web Browsers with Webpack

Learn more about setting up CaffeineScript for browser-development with webpack [here](https://github.com/caffeine-suite/caffeine-script-webpack-demo).

# Syntax Highlighting

* **github**: The closest option is CoffeeScript. It's OK, but it misses a lot. Github does not allow 3rd party syntax highlighting. We need your help! Please contribute to [this conversation](https://github.com/github/linguist/issues/2598) or [this one](https://github.com/github/linguist/issues/1792).
* **sublimetext 3**: 99% complete highlighting is included in the caffeing-script npm, but not yet bundled for SublimeText. You can get the files [here](https://github.com/shanebdavis/caffeine-script/tree/master/editors). On mac, copy them into `~/Library/Application\ Support/Sublime\ Text\ 3/Packages/User/`.
* **textmate**: Nothing yet. How hard is it to translate the SublimeText file?

Note, syntax highlighters aren't used to this new everything-is-block-based approach. As such, I haven't figured out how to get *all* legal CaffeineScript string and regexp blocks to highlight correctly.

Examples of legal string blocks that may not get syntax highlighted:
```
# probably doesn't get highlighted correctly
hi ""
  this is in a comment

# does get highlighted correctly
hi
  ""
    this is in a comment
```