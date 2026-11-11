import assert from "node:assert";
import test from "node:test";
import { BFF } from "../src/BFF.ts";

const bff = new BFF();

test("inc", t => {
  assert.strictEqual(bff.inc(1), "+");
  assert.strictEqual(bff.inc(3), "+++");
  assert.strictEqual(bff.inc(0), "");
  assert.strictEqual(bff.inc(-1), "-");
});

test("dec", t => {
  assert.strictEqual(bff.dec(1), "-");
  assert.strictEqual(bff.dec(3), "---");
  assert.strictEqual(bff.dec(0), "");
  assert.strictEqual(bff.dec(-1), "+");
});

test("rgt", t => {
  assert.strictEqual(bff.rgt(1), ">");
  assert.strictEqual(bff.rgt(3), ">>>");
  assert.strictEqual(bff.rgt(0), "");
  assert.strictEqual(bff.rgt(-1), "<");
});

test("lft", t => {
  assert.strictEqual(bff.lft(1), "<");
  assert.strictEqual(bff.lft(3), "<<<");
  assert.strictEqual(bff.lft(0), "");
  assert.strictEqual(bff.lft(-1), ">");
});

test("out", t => {
  assert.strictEqual(bff.out(), ".");
});

test("inp", t => {
  assert.strictEqual(bff.inp(), ",");
});

test("loop", t => {
  assert.strictEqual(
    bff.loop(() => bff.dec(1)),
    "[-]"
  );
  assert.strictEqual(
    bff.loop(bff => bff.dec(1)),
    "[-]"
  );
  assert.strictEqual(
    bff.loop(() => bff.loop(() => bff.dec(1))),
    "[[-]]"
  );
});

test("raw", t => {
  assert.strictEqual(bff.raw("Hello, World!"), "Hello, World!");
  assert.strictEqual(bff.raw("Hello, World!", 2), "Hello, World!Hello, World!");
  assert.strictEqual(bff.raw("Hello, World!", 0), "");
  assert.throws(() => bff.raw("Hello, World!", -1));
});
