'use strict';

/********************************************************************
* GENOTYPE CONSTRUCTOR FUNCTION
*********************************************************************/
function Genotype(length) {
  this.length = length || 42;
  this.string = '';
  this.fitness = 0;
  this.genesis();
}

// A set of all possible characters.
exports.charset = [];
for (var c=32; c<127; c++) {
  exports.charset.push(String.fromCharCode(c));
}

Genotype.prototype.mutationRate = 0.05;

Genotype.prototype._randomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

Genotype.prototype.genesis = function() {
  this.string = '';
  for (var i=0; i<this.length; i++) {
    var randomIndex = this._randomInt(0, exports.charset.length);
    this.string += exports.charset[randomIndex];
  }
};

Genotype.prototype.triggerMutation = function() {
  // var triggeredMutation = Math.random() > exports.mutationRate;
};

module.exports = Genotype;
