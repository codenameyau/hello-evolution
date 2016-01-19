'use strict';

var assert = require('chai').assert;
var Genotype = require('../src/genotype');

describe('simulation', function() {

  describe('.genesis()', function() {
    var length = 20;
    var genotypeA = new Genotype(length);
    var genotypeB = new Genotype(length);

    it('should create a string of the given length', function() {
      assert.lengthOf(genotypeA.string, length);
      assert.lengthOf(genotypeB.string, length);
    });

    it('should create a random string with each subsequent call', function() {
      assert.notEqual(genotypeA.string, genotypeB.string);
    });
  });

});
