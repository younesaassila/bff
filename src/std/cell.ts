import type { BFF, IntOrChar } from "../BFF.ts";

export const cell = (bff: BFF) => {
  const clear = (): string => bff.loop(() => bff.dec());

  const set = (n: IntOrChar): string => clear() + bff.inc(n);

  const move = (to: number | number[]): string => {
    if (!Array.isArray(to)) {
      to = [to];
    }
    return bff.loop(() => {
      bff.dec();
      let pos = 0;
      for (const t of to) {
        if (typeof t !== "number") {
          throw new TypeError(`Expected a number for to, but got ${typeof t}`);
        }
        if (!Number.isInteger(t)) {
          throw new RangeError(`Expected an integer for to, but got ${t}`);
        }
        bff.rgt(t - pos);
        bff.inc();
        pos = t;
      }
      bff.lft(pos);
    });
  };

  const copy = (to: number | number[], tmp: number): string => {
    if (!Array.isArray(to)) {
      to = [to];
    }
    return move(to.concat(tmp)) + bff.rgt(tmp) + move([-tmp]) + bff.lft(tmp);
  };

  return { clear, set, move, copy };
};
