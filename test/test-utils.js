'use strict';

var assert = require('chai').assert;
var utils = require('../src/utils');

describe('utils', function() {

  describe('.hammingDistance()', function() {
    it('should return 3 for "karolin" and "kathrin"', function() {
      var stringA = 'karolin';
      var stringB = 'kathrin';
      assert.strictEqual(utils.hammingDistance(stringA, stringB), 3);
    });

    it('should return 2 for "1011101" and "1001001"', function() {
      var stringA = '1011101';
      var stringB = '1001001';
      assert.strictEqual(utils.hammingDistance(stringA, stringB), 2);
    });
  });

  describe('.pickFromArray()', function() {
    it('should return the same number of items as the picks arg', function() {
      var picks = 3;
      var array = [1, 2, 3, 4, 5];
      var pickedItems = utils.pickFromArray(array, picks);
      assert.isArray(pickedItems);
      assert.lengthOf(pickedItems, picks);
    });

    it('should return all items if the number of picks > length', function() {
      var picks = 6;
      var array = [1, 2, 3, 4, 5];
      var pickedItems = utils.pickFromArray(array, picks);
      assert.lengthOf(pickedItems, array.length);
    });

    it('should not changed the original array', function() {
      var array = [1, 2, 3, 4, 5];
      var arrayCopy = [1, 2, 3, 4, 5];
      utils.pickFromArray(array, 3);
      assert.equal(array, arrayCopy);
    });
  });

});
