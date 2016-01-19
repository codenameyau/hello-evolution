'use strict';

var Genotype = require('./genotype');

/********************************************************************
* PROPERTIES
*********************************************************************/
exports.idealString = 'Hello World!';
exports.population = [];
exports.populationSize = 20;
exports.generations = 0;


/********************************************************************
* METHODS
*********************************************************************/
exports.hammingDistance = function(stringA, stringB) {
  var distance = 0;
  var len = stringB.length;
  for (var i=0; i<len; i++) {
    if (stringA[i] !== stringB[i]) {
      distance++;
    }
  } return distance;
};

exports.calculateFitness = function(input, target) {
  return target.length - exports.hammingDistance(input, target);
};

exports.run = function() {
  for (var i=0; i<exports.populationSize; i++) {
    exports.population.push(new Genotype(exports.idealString.length));
  }
  console.log(exports.population);
};
