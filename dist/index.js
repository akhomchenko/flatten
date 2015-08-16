"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isArray = Array.isArray;
var isNone = function isNone(obj) {
  return obj === undefined || obj === null;
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

  return array.reduce(function (res, item) {
    return Array.prototype.concat.call(res, isArray(item) ? flatten(item) : [item]);
  }, []);
};

exports["default"] = flatten;
module.exports = exports["default"];