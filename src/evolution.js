'use strict';

/********************************************************************
* PROPERTIES
*********************************************************************/
var MAX_FITNESS = 255;
var MUTATION_RATE = 0.05;
exports.population = 100;
exports.generations = 0;
exports.algorithm = exports.sequentialMatching;

// Default charset is ascii 32 (space) to 126 (~).
exports.charset = [];
for (var c=32; c<127; c++) {
  exports.charset.push(String.fromCharCode(c));
}


/********************************************************************
* FITNESS FUNCTIONS
*********************************************************************/
exports.sequentialMatching = function(input, target) {
  var matches = 0;
  var len = target.length;
  for (var i=0; i<len; i++) {
    if (input[i] === target[i]) {
      matches++;
    }
  }
  return Math.round(MAX_FITNESS * (matches / len));
};


exports.hammingDistance = function(input, target) {

};


/********************************************************************
* METHODS
*********************************************************************/
var _randomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

exports.triggerMutation = function() {
  return Math.random() > MUTATION_RATE;
};

exports.calculateFitness = function(input, target) {
  return exports.algorithm(input, target);
};

exports.createString = function(length) {
  var string = '';
  for (var __=0; __<length; __++) {
    string += exports.charset[_randomInt(0, length)];
  } return string;
};

exports.run = function(target) {
  var samplePopulation = [];
};
