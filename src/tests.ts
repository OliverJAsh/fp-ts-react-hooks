import * as assert from 'assert';
import * as O from 'fp-ts/lib/Option';
import { eq } from './index';

// primitives
assert.strictEqual(eq.equals(1, 1), true);
assert.strictEqual(eq.equals(1, 2), false);

// options
assert.strictEqual(eq.equals(O.some(1), O.some(1)), true);
assert.strictEqual(eq.equals(O.some(1), O.some(2)), false);

// nested options
assert.strictEqual(eq.equals(O.some(O.some(1)), O.some(O.some(1))), true);
assert.strictEqual(eq.equals(O.some(O.some(1)), O.some(O.some(2))), false);

// array
assert.strictEqual(eq.equals([1], [1]), true);
assert.strictEqual(eq.equals([1], [2]), false);

// nested array
assert.strictEqual(eq.equals([[1]], [[1]]), true);
assert.strictEqual(eq.equals([[1]], [[2]]), false);

// mixed options and primitives
assert.strictEqual(eq.equals(O.some(1), 1), false);

// mixed options and arrays
assert.strictEqual(eq.equals(O.some([1]), O.some([1])), true);
