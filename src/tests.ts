import * as assert from 'assert';
import * as O from 'fp-ts/lib/Option';
import { eqDependency } from './index';

// primitives
assert.strictEqual(eqDependency.equals(1, 1), true);
assert.strictEqual(eqDependency.equals(1, 2), false);

// options
assert.strictEqual(eqDependency.equals(O.some(1), O.some(1)), true);
assert.strictEqual(eqDependency.equals(O.some(1), O.some(2)), false);

// nested options
assert.strictEqual(
    eqDependency.equals(O.some(O.some(1)), O.some(O.some(1))),
    true,
);
assert.strictEqual(
    eqDependency.equals(O.some(O.some(1)), O.some(O.some(2))),
    false,
);

// array
assert.strictEqual(eqDependency.equals([1], [1]), true);
assert.strictEqual(eqDependency.equals([1], [2]), false);

// nested array
assert.strictEqual(eqDependency.equals([[1]], [[1]]), true);
assert.strictEqual(eqDependency.equals([[1]], [[2]]), false);

// mixed options and primitives
assert.strictEqual(eqDependency.equals(O.some(1), 1), false);

// mixed options and arrays
assert.strictEqual(eqDependency.equals(O.some([1]), O.some([1])), true);
