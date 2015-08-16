"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isArray = Array.isArray;
var isNone = function isNone(obj) {
  return obj === undefined || obj === null;
};

var pushToArray = function pushToArray(array, items) {
  var offset = array.length;

  for (var i = 0; i < items.length; i++) {
    array[offset + i] = items[i];
  }
};

/**
 * @param {Array} array to be flattened
 * @returns {Array} new flat array
 */
var flatten = function flatten(array) {
  if (isNone(array)) {
    return [];
  }

  if (!isArray(array)) {
    return [array];
  }

  var res = [];

  for (var i = 0; i < array.length; i++) {
    var item = array[i];

    pushToArray(res, isArray(item) ? flatten(item) : [item]);
  }

  return res;
};

exports["default"] = flatten;
module.exports = exports["default"];