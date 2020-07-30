# TODO


Need to fix my fix. I think I rewrite argv; I shouldn't!

```bash
# a.caf: console.log process.argv
> caf a.caf 123                                                                                    (258ms) 11:32:14 07/02
[
  '/Users/shanebdavis/dev/art-suite-foundations/packages/art-suite/cli/a.caf',
  '123'
]

# a.coffee: console.log process.argv
> coffee a.coffee 123
[
  'coffee',
  '/Users/shanebdavis/dev/art-suite-foundations/packages/art-suite/cli/a.coffee',
  '123'
]
```