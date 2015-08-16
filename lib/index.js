const isArray = Array.isArray;
const isNone = obj => obj === undefined || obj === null;

const pushToArray = (array, items) => {
  const offset = array.length;

  for (let i = 0; i < items.length; i++) {
    array[offset + i] = items[i];
  }

  return array;
};

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
    pushToArray(res, isArray(item) ? flatten(item) : [item]), []);
};

export default flatten;
