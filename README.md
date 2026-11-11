# bff

Brainfuck, friendlier.

## API

### `inc(n: int | char = 1)`

Increment the byte at the data pointer by `n`. If `n` is negative, equivalent to `dec(-n)`.

### `dec(n: int | char = 1)`

Decrement the byte at the data pointer by `n`. If `n` is negative, equivalent to `inc(-n)`.

### `rgt(n: int | char = 1)`

Increment the data pointer by `n`. If `n` is negative, equivalent to `lft(-n)`.

### `lft(n: int | char = 1)`

Decrement the data pointer by `n`. If `n` is negative, equivalent to `rgt(-n)`.

### `out()`

Output the byte at the data pointer.

### `inp()`

Accept one byte of input, storing its value in the byte at the data pointer.

### `loop(f: function)`

Run the function `f` while the byte at the data pointer is nonzero.

### `raw(s: string, n: int | char = 1)`

Run the Brainfuck code in `s` `n` times. Throws an error if `n` is negative.
