export type Count = number | string;
export type Plugin<T extends object = object> = (bff: BFF) => T;

type UnionToIntersection<U> = (
  U extends unknown ? (x: U) => void : never
) extends (x: infer I) => void
  ? I
  : never;

export class BFF {
  #stringBuilder: string[] = [];

  constructor() {}

  #parseCount = (n: Count): number => {
    if (typeof n === "string") {
      if (n.length !== 1) {
        throw new TypeError(
          `Expected a single character for n, but got ${n.length} characters`
        );
      }
      return n.charCodeAt(0);
    }
    if (!Number.isInteger(n)) {
      throw new TypeError(`Expected an integer for n, but got ${typeof n}`);
    }
    return n;
  };

  /**
   * Run the Brainfuck code in `s` `n` times. Throws an error if `n` is negative.
   */
  raw = (s: string, n: Count = 1): string => {
    if (typeof s !== "string") {
      throw new TypeError(`Expected a string for s, but got ${typeof s}`);
    }
    const k = this.#parseCount(n);
    if (k < 0) {
      throw new RangeError(
        `Expected a non-negative integer for n, but got ${n}`
      );
    }
    const repeatedString = s.repeat(k);
    this.#stringBuilder.push(repeatedString);
    return repeatedString;
  };

  /**
   * Increment the byte at the data pointer by `n`. If `n` is negative, equivalent to `dec(-n)`.
   */
  inc = (n: Count = 1): string => {
    const k = this.#parseCount(n);
    return k > 0 ? this.raw("+", k) : this.raw("-", -k);
  };

  /**
   * Decrement the byte at the data pointer by `n`. If `n` is negative, equivalent to `inc(-n)`.
   */
  dec = (n: Count = 1): string => {
    return this.inc(-n);
  };

  /**
   * Increment the data pointer by `n`. If `n` is negative, equivalent to `lft(-n)`.
   */
  rgt = (n: Count = 1): string => {
    const k = this.#parseCount(n);
    return k > 0 ? this.raw(">", k) : this.raw("<", -k);
  };

  /**
   * Decrement the data pointer by `n`. If `n` is negative, equivalent to `rgt(-n)`.
   */
  lft = (n: Count = 1): string => {
    return this.rgt(-n);
  };

  /**
   * Output the byte at the data pointer.
   */
  out = (): string => {
    return this.raw(".");
  };

  /**
   * Accept one byte of input, storing its value in the byte at the data pointer.
   */
  inp = (): string => {
    return this.raw(",");
  };

  /**
   * Run the function `f` while the byte at the data pointer is nonzero.
   */
  loop = (f: (bff: BFF) => void): string => {
    if (typeof f !== "function") {
      throw new TypeError(`Expected a function for f, but got ${typeof f}`);
    }
    const currentLength = this.#stringBuilder.length;
    this.raw("[");
    f.call(this, this);
    this.raw("]");
    return this.#stringBuilder.slice(currentLength).join("");
  };

  toString = (): string => {
    return this.#stringBuilder.join("");
  };

  static with<P extends Plugin[]>(
    ...plugins: P
  ): BFF & UnionToIntersection<ReturnType<P[number]>> {
    const bff = new BFF();
    for (const plugin of plugins) {
      const ext = plugin(bff);
      for (const key of Object.keys(ext)) {
        if (key in bff) {
          throw new Error(
            `Plugin helper "${key}" collides with an existing member`
          );
        }
      }
      Object.assign(bff, ext);
    }
    return bff as BFF & UnionToIntersection<ReturnType<P[number]>>;
  }
}
