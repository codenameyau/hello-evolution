'use strict';

var Phenotype = require('./phenotype');
var utils = require('./utils');

/********************************************************************
* PROPERTIES
*********************************************************************/
exports.MAX_GENERATIONS = 500;
exports.POPULATION_SIZE = 10;
exports.target = 'Hello World!';
var generations = 0;


/********************************************************************
* SELECTION ALGORITHMS
*********************************************************************/
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

exports.run = function() {
  var population = exports.createPopulation();
  // console.log(population);
  // console.log('\n');

  // Simulation.
  for (var t=0; t<=exports.MAX_GENERATIONS; t++) {
    var parents = exports.eliteRankSelection(population);
    console.log('Generation: %s | Max Fitness: %s | Phenotype: "%s"',
      t, parents[0].fitness, parents[0].string);
    if (exports.hasReachedTarget(parents[0])) { break; }
    population = exports.breedParents(parents);
    generations++;
  }
};
