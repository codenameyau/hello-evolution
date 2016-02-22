'use strict';

exports.hammingDistance = function(stringA, stringB) {
  var distance = 0;
  var len = stringB.length;
  for (var i=0; i<len; i++) {
    if (stringA[i] !== stringB[i]) {
      distance++;
    }
  } return distance;
};

exports.sortDesc = function(array, property) {
  array.sort(function(a, b) {
    return b[property] - a[property];
  });
};

exports.randomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

exports.pickFromArray = function(array, picks) {
  // Truncate number of picks to length of array.
  picks = picks > array.length ? array.length : picks;

  var picked = [];
  var currentPicks = 0;
  var temp;

  // Move picks to start of array and continue.
  for (var i=0; i<picks; i++) {
    var randomIndex = exports.randomInt(currentPicks, array.length);
    picked.push(array[randomIndex]);
    temp = array[currentPicks];
    array[currentPicks] = array[randomIndex];
    array[randomIndex] = temp;
  } return picked;
};
