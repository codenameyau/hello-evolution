'use strict';

var Phenotype = require('./phenotype');
var utils = require('./utils');

/********************************************************************
* PROPERTIES
*********************************************************************/
exports.MAX_GENERATIONS = 500;
exports.POPULATION_SIZE = 10;
exports.NUM_TRIALS = 50;
exports.target = 'Hello World!';


/********************************************************************
* SELECTION ALGORITHMS
*********************************************************************/
exports.rankProbability = function(rank) {
  var ps = 0.5;
  return Math.pow((1 - ps), rank - 1) * ps;
};

exports.calculateFitness = function(phenotype) {
  var distance = utils.hammingDistance(phenotype.string, exports.target);
  phenotype.fitness = exports.target.length - distance;
};

exports.createPopulation = function() {
  var population = [];
  for (var i=0; i<exports.POPULATION_SIZE; i++) {
    var phenotype = new Phenotype('', exports.target.length);
    exports.calculateFitness(phenotype);
    population.push(phenotype);
  } return population;
};

exports.eliteRankSelection = function(population) {
  var parents = [];
  // Make number of survivors a normal distribution.
  var numSurvived = Math.floor((
      utils.randomInt(2, exports.POPULATION_SIZE) +
      utils.randomInt(2, exports.POPULATION_SIZE)) / 2);
  numSurvived = (numSurvived < 2) ? 2 : numSurvived;
  utils.sortDesc(population, 'fitness');
  for (var i=0; i<numSurvived; i++) {
    parents.push(population[i]);
  } return parents;
};

exports.simulateMutation = function(parent, index) {
  return (Math.random() < parent.mutationRate)
    ? parent.getRandomCharacter() : parent.string[index];
};

exports.createChild = function(p1, p2) {
  var length = p1.string.length;
  var mixedString = '';
  for (var c=0; c<length; c++) {
    var gene1 = exports.simulateMutation(p1, c);
    var gene2 = exports.simulateMutation(p2, c);
    var genePool = [gene1, gene2];
    mixedString += genePool[utils.randomInt(0, genePool.length)];
  }
  var child = new Phenotype(mixedString);
  exports.calculateFitness(child);
  return child;
};

exports.breedParents = function(parents) {
  var nextGeneration = [];
  // Pick random two parents to breed in each iteration.
  for (var i=0; i<exports.POPULATION_SIZE; i++) {
    var selection = utils.pickFromArray(parents, 2);
    var p1 = selection[0];
    var p2 = selection[1];
    nextGeneration.push(exports.createChild(p1, p2));
  } return nextGeneration;
};

exports.hasReachedTarget = function(phenotype) {
  return phenotype.string === exports.target;
};

exports.run = function(log) {
  log = log || false;
  var generations = 0;
  var population = exports.createPopulation();
  for (var t=0; t<=exports.MAX_GENERATIONS; t++) {
    var parents = exports.eliteRankSelection(population);
    if (log) {
      console.log('Generation: %s | Max Fitness: %s | Phenotype: "%s"',
        t, parents[0].fitness, parents[0].string);
    }
    if (exports.hasReachedTarget(parents[0])) { break; }
    population = exports.breedParents(parents);
    generations++;
  }

  // Return number of generations to reach target fitness.
  return generations;
};

exports.runTrial = function() {
  var numGenerations = [];
  for (var i=0; i<exports.NUM_TRIALS; i++) {
    numGenerations.push(exports.run());
  }
  console.log('Target String: "%s"', exports.target);
  console.log('Population Size: %s', exports.POPULATION_SIZE);
  console.log();
  console.log('Number of Trials: %s', exports.NUM_TRIALS);
  console.log('Mean Generations: %s', utils.mean(numGenerations));
  console.log('Standard Deviation: %s', utils.stdev(numGenerations));
};
