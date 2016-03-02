'use strict';

var utils = require('./utils');

/********************************************************************
* GENOTYPE CONSTRUCTOR FUNCTION
*********************************************************************/
function Phenotype(string, length) {
  this.mutationRate = 0.10;
  this.string = string || this.genesis(length);
  this.fitness = 0;
  this.diversity = 0;
}

// A set of all possible characters.
var charset = [];
for (var c=32; c<127; c++) {
  charset.push(String.fromCharCode(c));
}

Phenotype.prototype.getRandomCharacter = function() {
  return charset[utils.randomInt(0, charset.length)];
};

Phenotype.prototype.genesis = function(length) {
  var string = '';
  for (var i=0; i<length; i++) {
    string += this.getRandomCharacter();
  } return string;
};

Phenotype.prototype.replicate = function(char) {
  // Simple point mutation without robust error correction.
  return (Math.random() < this.mutationRate)
    ? this.getRandomCharacter() : char;
};

Phenotype.prototype.mitosis = function() {
  var replicatedSequence = '';
  for (var i=0; i<this.string.length; i++) {
    replicatedSequence += this.replicate(this.string[i]);
  } this.string = replicatedSequence;
};

module.exports = Phenotype;
