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

exports.range = function(min, max, step) {
  step = step || 1;
  var values = [];
  for (var i=min; i<max; i+=step) {
    values.push(i);
  } return values;
};

exports.shuffle = function(array) {
  for (var i=0, randomIndex, temp; i<array.length; i++) {
    randomIndex = exports.randomInt(i, array.length);
    temp = array[randomIndex];
    array[randomIndex] = array[i];
    array[i] = temp;
  } return array;
};

exports.pickFromArray = function(array, picks) {
  // Truncate number of picks to length of array.
  var length = array.length;
  picks = picks > length ? length : picks;

  // Use a raffling algorithm to select picks.
  var raffleNumbers = exports.range(0, length);
  exports.shuffle(raffleNumbers);
  var pickedItems = [];
  for (var i=0; i<picks; i++) {
    pickedItems.push(array[raffleNumbers[i]]);
  } return pickedItems;
};
