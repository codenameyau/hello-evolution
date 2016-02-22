'use strict';

var assert = require('chai').assert;
var Phenotype = require('../src/phenotype');

describe('simulation', function() {

  describe('.genesis()', function() {
    var length = 20;
    var phenotypeA = new Phenotype('', length);
    var phenotypeB = new Phenotype('', length);

    it('should create a string of the given length', function() {
      assert.lengthOf(phenotypeA.string, length);
      assert.lengthOf(phenotypeB.string, length);
    });

    it('should create a random string with each subsequent call', function() {
      assert.notEqual(phenotypeA.string, phenotypeB.string);
    });
  });

});
