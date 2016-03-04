'use strict';

var async = require('async');
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

exports.calculateDiversity = function(population) {
  // TODO: Find O(n*log(n)) algorithm to calculate diversity.
  for (var i=0; i<population.length; i++) {
    var totalDistance = 0;
    for (var j=0; j<population.length; j++) {
      if (i !== j) {
        totalDistance += utils.hammingDistance(
          population[i].string, population[j].string);
      }
    }
    var diversity = totalDistance / (population.length - 1);
    population[i].diversity = utils.round(diversity);
    population[i].calculateScore();
  }
};

exports.createPopulation = function() {
  var population = [];
  for (var i=0; i<exports.POPULATION_SIZE; i++) {
    var phenotype = new Phenotype('', exports.target.length);
    exports.calculateFitness(phenotype);
    population.push(phenotype);
  }
  exports.calculateDiversity(population);
  return population;
};

exports.selectParents = function(population, numSelections) {
  var parents = [];
  for (var i=0; i<numSelections; i++) {
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
  return new Phenotype(mixedString);
};

exports.breedParents = function(parents) {
  var nextGeneration = [];
  // Pick random two parents to breed in each iteration.
  for (var i=0; i<exports.POPULATION_SIZE; i++) {
    var selection = utils.pickFromArray(parents, 2);
    var p1 = selection[0];
    var p2 = selection[1];
    var child = exports.createChild(p1, p2);
    exports.calculateFitness(child);
    nextGeneration.push(child);
  }
  exports.calculateDiversity(nextGeneration);
  return nextGeneration;
};

exports.run = function() {
  var results = [];
  var generations = 0;
  var population = exports.createPopulation();
  for (var t=0; t<=exports.MAX_GENERATIONS; t++) {
    // Make number of selections normally distribution.
    var numSelections = Math.floor((
        utils.randomInt(2, exports.POPULATION_SIZE) +
        utils.randomInt(2, exports.POPULATION_SIZE)) / 2);

    // Ensure that there are always at least 2 parents.
    numSelections = (numSelections > 2) ? numSelections : 2;
    utils.sortDesc(population, 'score');
    var parents = exports.selectParents(population, numSelections);

    // Determine max fitness and diversity for this generation.
    var mostFit = utils.findBest(population, 'fitness');
    var mostDiverse = utils.findBest(population, 'diversity');

    // Save results for this generation.
    results.push({
      generation: t,
      survived: numSelections,
      maxFitness: mostFit.fitness,
      maxDiversity: mostDiverse.diversity,
      maxScore: population[0].score,
      phenotype: mostFit.string
    });

    // Iterate next generation if target fitness has not been reached.
    if (mostFit.string === exports.target) { break; }
    population = exports.breedParents(parents);
    generations++;
  }
  return results;
};

exports.runTrial = function() {
  var trialResults = [];
  var trials = utils.range(0, exports.NUM_TRIALS);
  async.each(trials, function(item, callback) {
    var results = exports.run();
    trialResults.push(results.length);
    callback(null);
  }, function(error) {
    if (error) { return console.log(error); }
    console.log('Target String: "%s"', exports.target);
    console.log('Population Size: %s', exports.POPULATION_SIZE);
    console.log('\nNumber of Trials: %s', exports.NUM_TRIALS);
    console.log('Mean Generations: %s', utils.mean(trialResults));
    console.log('Standard Deviation: %s', utils.stdev(trialResults));
  });
};

exports.log = function(results) {
  var headings = Object.keys(results[0]);
  var tableHeading = headings.join(' | ');
  var tableSeparator = '-'.repeat(tableHeading.length);
  for (var i=0; i<results.length; i++) {
    if (i % 50 === 0) {
      console.log('\n' + tableSeparator);
      console.log(tableHeading);
      console.log(tableSeparator);
    }
    var generation = results[i];
    var row = '';
    for (var key in generation) {
      if (generation.hasOwnProperty(key)) {
        var headingLength = key.length;
        row += generation[key] + ' '.repeat(
          headingLength + 3 - String(generation[key]).length);
      }
    } console.log(row);
  }
};
