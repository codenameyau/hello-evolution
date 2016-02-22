'use strict';

var assert = require('chai').assert;
var simulation = require('../src/simulation');

describe('simulation', function() {

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
