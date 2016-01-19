'use strict';

var assert = require('chai').assert;
var simulation = require('../src/simulation');

describe('simulation', function() {

  describe('.hammingDistance()', function() {
    it('should return 3 for "karolin" and "kathrin"', function() {
      var stringA = 'karolin';
      var stringB = 'kathrin';
      assert.strictEqual(simulation.hammingDistance(stringA, stringB), 3);
    });

    it('should return 2 for "1011101" and "1001001"', function() {
      var stringA = '1011101';
      var stringB = '1001001';
      assert.strictEqual(simulation.hammingDistance(stringA, stringB), 2);
    });
  });

});
