// generic test function to verify whether mocha and chai is set up properly.

var assert = require('chai').assert;

describe('MathUtils', () => {
  describe('add', () => {
    it('should add two numbers correctly', () => {
      // Arrange
      const num1 = 5;
      const num2 = 10;

      // Act
      const result = MathUtils.add(num1, num2);

      // Assert
      assert.equal(result, 15);
    });
  });
});

class MathUtils {
  static add(a: number, b: number): number {
    return a + b;
  }
}
