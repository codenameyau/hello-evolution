'use strict';

var Genotype = require('./genotype');

/********************************************************************
* PROPERTIES
*********************************************************************/
exports.target = 'Hello World!';
exports.populationSize = 20;
exports.selectionProbability = 0.5;
var generations = 0;
var population = [];


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

exports.calculateFitness = function(genotype) {
  var distance = exports.hammingDistance(genotype.string, exports.target);
  genotype.fitness = exports.target.length - distance;
};

exports.rankFitness = function(array) {
  array.sort(function(a, b) {
    return b.fitness - a.fitness;
  });
  console.log(array);
};

exports.rankSelectionProbability = function(rank) {
  var ps = exports.selectionProbability;
  return Math.pow((1 - ps), rank - 1) * ps;
};

exports.createPopulation = function() {
  for (var i=0; i<exports.populationSize; i++) {
    var genotype = new Genotype(exports.target.length);
    exports.calculateFitness(genotype);
    population.push(genotype);
  }
};

exports.run = function() {
  exports.createPopulation();
  exports.rankFitness(population);
  for (var i=0; i<exports.populationSize; i++) {
    var rank = i + 1;
    var genotype = population[i];
    var probabilitySelected = exports.rankSelectionProbability(rank);
    console.log(genotype.fitness + ' ' + probabilitySelected);
  }
  // console.log(population);
};
