'use strict';

var Phenotype = require('./phenotype');

/********************************************************************
* PROPERTIES
*********************************************************************/
exports.BASE_SELECTION_PROBABILITY = 0.5;
exports.MAX_GENERATIONS = 1000;
exports.POPULATION_SIZE = 20;
exports.target = 'Hello World!';
var generations = 0;


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

exports.calculateFitness = function(phenotype) {
  var distance = exports.hammingDistance(phenotype.string, exports.target);
  phenotype.fitness = exports.target.length - distance;
};

exports.sortDesc = function(array, property) {
  array.sort(function(a, b) {
    return b[property] - a[property];
  });
};

exports.rankProbability = function(rank) {
  var ps = exports.BASE_SELECTION_PROBABILITY;
  return Math.pow((1 - ps), rank - 1) * ps;
};

exports.createPopulation = function() {
  var population = [];
  for (var i=0; i<exports.POPULATION_SIZE; i++) {
    var phenotype = new Phenotype(exports.target.length);
    exports.calculateFitness(phenotype);
    population.push(phenotype);
  } return population;
};

exports.randomProbability = function() {
  return Math.random();
};

/********************************************************************
* SELECTION ALGORITHMS
*********************************************************************/
exports.eliteRankSelection = function(population) {
  var parents = [];
  exports.sortDesc(population, 'fitness');

  // Select first parent via elitism.
  parents.push(population[0]);

  // Select other parent via rank selection.
  var chanceSelected = exports.randomProbability();
  var pHigh = 1, pLow = 0;
  for (var rank=1; rank<exports.POPULATION_SIZE; rank++) {
    pLow = exports.rankProbability(rank);
    if (chanceSelected > pLow && chanceSelected < pHigh) {
      parents.push(population[rank]);
      break;
    } else {
      pHigh = pLow;
    }
  }

  // Only 2 parents should be selected.
  return parents;
};

exports.run = function() {
  var population = exports.createPopulation();

  // While loop starts here.
  var parents = exports.eliteRankSelection(population);
  console.log(parents);

  // Loop with next generation.
  generations++;
};
