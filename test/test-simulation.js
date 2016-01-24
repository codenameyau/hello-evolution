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

  describe('.rankProbability()', function() {
    it('should return the correct probabilities', function() {
      simulation.selectionProbability = 0.5;
      assert.strictEqual(simulation.rankProbability(1), 0.5);
      assert.strictEqual(simulation.rankProbability(2), 0.25);
      assert.strictEqual(simulation.rankProbability(3), 0.125);
      assert.strictEqual(simulation.rankProbability(4), 0.0625);
      assert.strictEqual(simulation.rankProbability(5), 0.03125);
      assert.strictEqual(simulation.rankProbability(6), 0.015625);
      assert.strictEqual(simulation.rankProbability(7), 0.0078125);
    });
  });

});
