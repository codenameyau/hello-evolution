'use strict';

var utils = require('./utils');

/********************************************************************
* GENOTYPE CONSTRUCTOR FUNCTION
*********************************************************************/
function Phenotype(string, length) {
  // The mutation rate is optimized at 10%.
  this.mutationRate = 0.1;

  // The phenotype string.
  this.string = string || this.genesis(length);

  // The haming distance of the simulation target fitness.
  this.fitness = 0;

  // The total haming distance difference relative to the population.
  this.diversity = 0;

  // A weighted sum of fitness and diversity.
  this.score = 0;
}

// A set of all possible characters.
var charset = [];
for (var c=32; c<127; c++) {
  charset.push(String.fromCharCode(c));
}

Phenotype.prototype.getRandomCharacter = function() {
  return charset[utils.randomInt(0, charset.length)];
};

Phenotype.prototype.calculateScore = function() {
  // Adjust the weight of the score here or override the prototype.
  // An equal weight for diversity and fitness performs the best.
  this.score = utils.round(this.fitness + this.diversity);
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
