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

exports.mean = function(numbers) {
  if (!numbers.length) { return 0; }
  var cumulation = 0;
  for (var i=0; i<numbers.length; i++) {
    cumulation += numbers[i];
  } return cumulation / numbers.length;
};

exports.stdev = function(numbers) {
  if (!numbers.length) { return 0; }
  var avg = exports.mean(numbers);
  var variances = [];
  for (var i=0; i<numbers.length; i++) {
    variances.push(Math.pow(avg - numbers[i], 2));
  }
  var variance = variances.reduce(function(prev, curr) {
    return prev + curr;
  }) / (numbers.length - 1);
  return Math.sqrt(variance);
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
