# TODO

### fix colorized errors

```bash
# a.caf has a syntax error:
# a.caf: (

# nice color error:
caf a.caf

# no color error for some reason even though code-path is very similar
caf -c a.caf

# even uglier error in the REPL (shell)
caf
> &a
```