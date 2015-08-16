const isArray = Array.isArray;
const isNone = obj => obj === undefined || obj === null;

/**
 * @param {Array} array to be flattened
 * @returns {Array} new flat array
 */
const flatten = array => {
  if (isNone(array)) {
    return [];
  }

  if (!isArray(array)) {
    return [array];
  }

  return array.reduce((res, item) =>
    Array.prototype.concat.call(res, isArray(item) ? flatten(item) : [item]),
    []);
};

export default flatten;
