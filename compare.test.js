import test from "ava";
import { compare } from ".";

const expectEqual = (t, l, r, depth) => t.is(compare(depth)(l, r), true);
const expectNotEqual = (t, l, r, depth) => t.is(compare(depth)(l, r), false);

test("empty", expectEqual, {}, {}, 0);
test("shallow", expectEqual, { a: 1 }, { a: 1 }, 0);
test(
	"shallow multiple",
	expectEqual,
	{ a: 1, b: 2, c: 3, d: "hi" },
	{ a: 1, b: 2, c: 3, d: "hi" },
	0
);
test(
	"depth 1",
	expectEqual,
	{ a: { nested: 1 }, b: { nested: "abcd" } },
	{ a: { nested: 1 }, b: { nested: "abcd" } },
	1
);
test(
	"depth 1 with arrays",
	expectEqual,
	{ a: [1, 2, 3, 4], b: [4, 3, 2, 1], c: "hi" },
	{ a: [1, 2, 3, 4], b: [4, 3, 2, 1], c: "hi" },
	1
);
test(
	"depth 2",
	expectEqual,
	{ a: { nested: { morenesting: 1 } }, b: { nested: { more: "abcd" } } },
	{ a: { nested: { morenesting: 1 } }, b: { nested: { more: "abcd" } } },
	2
);
test(
	"passes when checked depth is greater than needed",
	expectEqual,
	{ a: "abc" },
	{ a: "abc" },
	10
);

test("shallow fail same key", expectNotEqual, { a: "hi" }, { a: "hello" }, 10);
test(
	"shallow fail new key",
	expectNotEqual,
	{ a: "hi" },
	{ a: "hi", newThing: "hello" },
	10
);
test(
	"shallow fail removed key",
	expectNotEqual,
	{ a: "hi", b: "there" },
	{ a: "hi" },
	10
);
test("fail with array", expectNotEqual, {a : [1]}, {a: [1, 2]}, 1);
test(
	"fail when depth not deep enough",
	expectNotEqual,
	{ a: { nested: 1 } },
	{ a: { nested: 1 } },
	0
);
