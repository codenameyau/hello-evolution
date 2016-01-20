'use strict';

/********************************************************************
* GENOTYPE CONSTRUCTOR FUNCTION
*********************************************************************/
function Phenotype(length) {
  this.length = length || 42;
  this.mutationRate = 0.05;
  this.string = '';
  this.fitness = 0;
  this.genesis();
}

// A set of all possible characters.
var charset = [];
for (var c=32; c<127; c++) {
  charset.push(String.fromCharCode(c));
}

Phenotype.prototype._randomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

Phenotype.prototype.genesis = function() {
  this.string = '';
  for (var i=0; i<this.length; i++) {
    var randomIndex = this._randomInt(0, charset.length);
    this.string += charset[randomIndex];
  }
};

Phenotype.prototype.triggerMutation = function() {
  var triggeredMutation = Math.random() < this.mutationRate;
};

module.exports = Phenotype;
