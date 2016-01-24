'use strict';

var Phenotype = require('./phenotype');

/********************************************************************
* PROPERTIES
*********************************************************************/
exports.BASE_SELECTION_PROBABILITY = 0.5;
exports.MAX_GENERATIONS = 500;
exports.POPULATION_SIZE = 5;
exports.MITOSIS_COUNT = 5;
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


/********************************************************************
* SELECTION ALGORITHMS
*********************************************************************/
exports.eliteRankSelection = function(population) {
  var parents = [];
  exports.sortDesc(population, 'fitness');

  // Select first parent via elitism.
  parents.push(population[0]);

  // Select other parent (2 total) via rank selection.
  var chanceSelected = Math.random();
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

  return parents;
};

exports.randomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

exports.createChild = function(p1, p2) {
  var length = p1.length;
  var mixedString = '';
  for (var c=0; c<length; c++) {
    console.log(p1);
    console.log(p2);
    var genePool = [p1.string[c], p2.string[c]];
    mixedString += genePool[exports.randomInt(0, genePool.length)];
  }

  var child = new Phenotype(p1.length, mixedString);
  exports.calculateFitness(child);
  return child;
};

exports.breedParents = function(parents) {
  var nextGeneration = [];

  // Breed the parents.
  for (var i=0; i<exports.POPULATION_SIZE; i++) {

    // Make parents undergo mitosis for possible mutations.
    parents.map(function(parent) {
      parent.mitosis();
    });

    var p1 = parents[0];
    var p2 = parents[1];
    nextGeneration.push(exports.createChild(p1, p2));
  }
  return nextGeneration;
};

exports.hasReachedTarget = function(phenotype) {
  return phenotype.string === exports.target;
};

exports.run = function() {
  var population = exports.createPopulation();
  console.log(population);
  console.log('\n');

  // While loop starts here.
  for (var t=0; t<exports.MAX_GENERATIONS; t++) {
    var parents = exports.eliteRankSelection(population);
    if (exports.hasReachedTarget(parents[0])) {
      break;
    } else {
      console.log('Generation: %s | Max Fitness: %s | Phenotype: "%s"',
        t, parents[0].fitness, parents[0].string);
    }
    console.log('\n');
    console.log(parents);
    population = exports.breedParents(parents);
    generations++;
  }
};
