/*!
 * Daily Programmer - [2016-01-13] Challenge #249 [Intermediate]
 * Hello World Genetic or Evolutionary Algorithm
 * https://redd.it/40rs67
 */
'use strict';

var evolution = require('./evolution');

evolution.algorithm = evolution.sequenceMatching;
evolution.run();
console.log(evolution.charset);
