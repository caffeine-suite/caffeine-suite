Related: [[String Interpolation]]

CaffeineScript has lots of nice, streamlined ways to express strings:

```coffeescript
# CaffeineScript
a = "" To end of line string.
b = :word-string

c = ""
  This is
  my multiline
  string without newlines.

d = """
  This is
  my multiline
  string with newlines.
```

```javascript
// JavaScript
a = "To end of line string.";
b = "word-string";
c = "This is my multiline string without newlines.";
d = "This is\nmy multiline\nstring with newlines.";
```

### Unquoted Strings

There are several forms of strings which do not require quotes:

#### :WordStrings

WordStrings start with a : (colon). Every character after the colon, up to the first space, newline or delimiter character (`/:[^ ,\]\)\n]+/`) will be part of the string. The initial ':' is *not included* in the final output string.

WordStrings are inspired by the Ruby language's symbol syntax. Even though JavaScript ES6 (EcmaScript6) has 'symbols,' they are so broken it makes more sense for the colon-syntax to just resolve to strings. Word-strings allow many common strings to be expressed without the need for matching quotes: urls, files with paths, dependency-versions, NPM (Node Package Manager) package-names, and much more.

```coffeescript
:word                 == "word"
:caffeine-script      == "caffeine-script"
:80%                  == "80%"
:^1.2.3               == "^1.2.3
:www.foo.com          == "www.foo.com"
:../bar/foo.jpg       == "../bar/foo.jpg"
:http://cafscript.com == "http://cafscript.com"
:'hi'                 == "'hi'"
:"hi"                 == '"hi"'
```

#### #HashStrings

The # symbol followed by 1 or more legal identifier characters. The '#' character is included in the string. Though this clearly allows #hashtags, the primary motivation is to express hex-colors: #fff, #ab45ef, #0007.

```coffeescript
"#hashTAG" == #hashTAG
"#ff0"     == #ff0
```

NOTE: Comments start with a #, too, but they must be followed with a non-identifier character or EOF End Of File character. Generally they will be followed by a -, another #, a space or be the last character on the line.

#### 10UnitStrings

Any decimal number-literal, including signs, decimal-points and exponents which is immediately followed by one or more non-digit-identifier-characters is converted as-is into a string.

NOT: ES6-style octal, hex and binary literals are interpreted as numbers, not strings: 0o123, 0x123 and 0b101 are 83, 291 and 5, respectively.

Motivation: With these you can express most CSS (HTML's Cascading Style Sheet) properties without quotes. The main exception is percentages (i.e. 10%), for which you'll need to use the word-string method shown above (`:10%`) or the `10vh`, `10vw` and `10vmin` css units.

```coffeescript
10pt       == "10pt"
0.8percent == "0.8percent"
10times10  == "10times10"
```