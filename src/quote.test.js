import test from "node:test";
import assert from "node:assert/strict";
import { calculateQuote, formatPrice } from "./quote.js";

test("extras require a valid main service", () => {
  for (const id of ["", undefined, "unknown"]) {
    assert.equal(calculateQuote(id, ["tyre", "brakes"]), null);
  }
});

test("all twelve service and extra combinations match the agreed prices", () => {
  for (const [id, base] of [
    ["basic", 25],
    ["full", 55],
    ["ebike", 75],
  ]) {
    for (const [selected, surcharge] of [
      [[], 0],
      [["tyre"], 12],
      [["brakes"], 18],
      [["tyre", "brakes"], 30],
    ]) {
      const quote = calculateQuote(id, selected);
      assert.equal(quote.total, base + surcharge);
      assert.equal(quote.items.length, selected.length + 1);
    }
  }
  assert.equal(
    formatPrice(calculateQuote("ebike", ["tyre", "brakes"]).total),
    "£105.00",
  );
});

test("duplicate or unknown extras cannot add unintended charges", () => {
  assert.equal(calculateQuote("basic", ["tyre", "tyre", "unknown"]).total, 37);
});
