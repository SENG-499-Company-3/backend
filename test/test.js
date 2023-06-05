// test.js
const assert = require('assert');

// Assume we have a function named 'add' that adds two numbers.
function add(a, b) {
  return a + b;
}

// Mocha test suite
describe('Addition', () => {
  // Mocha test case
  it('should correctly add two numbers', () => {
    // Test assertion
    const result = add(2, 3);
    // Verify that the result is as expected
    assert.strictEqual(result, 5);
  });
});
