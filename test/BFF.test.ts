import assert from "node:assert";
import test from "node:test";
import { BFF } from "../src/BFF.ts";

test("inc", t => {
  const bff = new BFF();
  assert.strictEqual(bff.inc(1), "+");
  assert.strictEqual(bff.inc(3), "+++");
  assert.strictEqual(bff.inc(0), "");
  assert.strictEqual(bff.inc(-1), "-");
  assert.strictEqual(
    bff.inc("A"),
    "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
  );
  assert.throws(() => bff.inc("Hello, World!"));
});

test("dec", t => {
  const bff = new BFF();
  assert.strictEqual(bff.dec(1), "-");
  assert.strictEqual(bff.dec(3), "---");
  assert.strictEqual(bff.dec(0), "");
  assert.strictEqual(bff.dec(-1), "+");
  assert.strictEqual(
    bff.dec("A"),
    "-----------------------------------------------------------------"
  );
  assert.throws(() => bff.dec("Hello, World!"));
});

test("rgt", t => {
  const bff = new BFF();
  assert.strictEqual(bff.rgt(1), ">");
  assert.strictEqual(bff.rgt(3), ">>>");
  assert.strictEqual(bff.rgt(0), "");
  assert.strictEqual(bff.rgt(-1), "<");
});

test("lft", t => {
  const bff = new BFF();
  assert.strictEqual(bff.lft(1), "<");
  assert.strictEqual(bff.lft(3), "<<<");
  assert.strictEqual(bff.lft(0), "");
  assert.strictEqual(bff.lft(-1), ">");
});

test("out", t => {
  const bff = new BFF();
  assert.strictEqual(bff.out(), ".");
});

test("inp", t => {
  const bff = new BFF();
  assert.strictEqual(bff.inp(), ",");
});

test("loop", t => {
  const bff = new BFF();
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
  const bff = new BFF();
  assert.strictEqual(bff.raw("Hello, World!"), "Hello, World!");
  assert.strictEqual(bff.raw("Hello, World!", 2), "Hello, World!Hello, World!");
  assert.strictEqual(bff.raw("Hello, World!", 0), "");
  assert.throws(() => bff.raw("Hello, World!", -1));
});

test("block", t => {
  const bff = new BFF();
  assert.strictEqual(
    bff.block(() => bff.inc(1)),
    "+"
  );
  assert.strictEqual(
    bff.block(bff => bff.inc(1)),
    "+"
  );
  assert.strictEqual(
    bff.block(() => bff.block(() => bff.inc(1))),
    "+"
  );
});
