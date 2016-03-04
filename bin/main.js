/*!
 * Daily Programmer - [2016-01-13] Challenge #249 [Intermediate]
 * Hello World Genetic or Evolutionary Algorithm
 * https://redd.it/40rs67
 */
'use strict';

var simulation = require('../src/simulation');

simulation.target = 'Hello';
simulation.POPULATION_SIZE = 100;
simulation.MAX_GENERATIONS = 2000;
simulation.NUM_TRIALS = 50;
// simulation.log(simulation.run());
simulation.runTrial();
