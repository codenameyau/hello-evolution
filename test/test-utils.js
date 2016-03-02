'use strict';

var assert = require('chai').assert;
var utils = require('../src/utils');

describe('utils', function() {

  describe('.hammingDistance()', function() {
    it('should return 0 for two empty strings', function() {
      assert.strictEqual(utils.hammingDistance('', ''), 0);
    });

    it('should return 2 for "1011101" and "1001001"', function() {
      var stringA = '1011101';
      var stringB = '1001001';
      assert.strictEqual(utils.hammingDistance(stringA, stringB), 2);
    });

    it('should return 3 for "karolin" and "kathrin"', function() {
      var stringA = 'karolin';
      var stringB = 'kathrin';
      assert.strictEqual(utils.hammingDistance(stringA, stringB), 3);
    });
  });

  describe('.mean()', function() {
    it('should return 0 for an empty array', function() {
      var mean = utils.mean([]);
      assert.strictEqual(mean, 0);
    });

    it('should return an number for array of numbers', function() {
      var mean = utils.mean([5, 10, 15, 20, 25]);
      assert.isNumber(mean);
      assert.strictEqual(mean, 15);
    });
  });


  describe('.stdev()', function() {
    it('should return 0 for an empty array', function() {
      var stdev = utils.stdev([]);
      assert.strictEqual(stdev, 0);
    });

    it('should return an approximate stdev for array of numbers', function() {
      var stdev = utils.stdev([5, 10, 15, 20, 25]);
      assert.isNumber(stdev);
      assert.approximately(stdev, 7.905, 0.1);
    });
  });

  describe('.range()', function() {
    it('should return an array of values with an inclusive range', function() {
      var array = utils.range(0, 5);
      assert.isArray(array);
      assert.lengthOf(array, 5);
    });

    it('should return the correct values for a step', function() {
      var array = utils.range(0, 5, 2);
      assert.lengthOf(array, 3);
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
      var picks = 99;
      var array = [1, 2, 3, 4, 5];
      var pickedItems = utils.pickFromArray(array, picks);
      assert.lengthOf(pickedItems, array.length);
    });

    it('should not change the original array', function() {
      var array = [1, 2, 3, 4];
      var arrayCopy = [1, 2, 3, 4];
      utils.pickFromArray(array, 3);
      for (var i=0; i<array.length; i++) {
        assert.strictEqual(array[i], arrayCopy[i]);
      }
    });
  });

});
