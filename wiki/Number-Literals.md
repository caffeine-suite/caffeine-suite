[Home](./Home.md) - [Table of Contents](./contents.md) - [Github](https://github.com/caffeine-suite/caffeine-suite)

All [JavaScript ES6 (EcmaScript6) Number Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates) are accepted:


### Decimal

```coffeescript
1234567890
42
```

### Binary

Binary number syntax uses a leading zero, followed by a lowercase or uppercase Latin letter "B" (0b or 0B).

```coffeescript
0b10000000000000000000000000000000 # 2147483648
0b01111111100000000000000000000000 # 2139095040
0B00000000011111111111111111111111 # 8388607
```

### Octal numbers

Octal numbers are supported, by prefixing an octal number with "0o":

```coffeescript
0o755 # 493
0o644 # 420
```

### Hexadecimal

Hexadecimal number syntax uses a leading zero, followed by a lowercase or uppercase Latin letter "X" (0x or 0X).

```coffeescript
0xFFFFFFFFFFFFFFFFF # 295147905179352830000
0x123456789ABCDEF   # 81985529216486900
0XA                 # 10
```

### Exponentiation

```coffeescript
1E3   # 1000
2e6   # 2000000
0.1e2 # 10
```