const isArray = Array.isArray;
const isNone = obj => obj === undefined || obj === null;

const pushToArray = (array, items) => {
  const offset = array.length;

  for (let i = 0; i < items.length; i++) {
    array[offset + i] = items[i];
  }
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

  const res = [];

  for (let i = 0; i < array.length; i++) {
    const item = array[i];

    pushToArray(res, isArray(item) ? flatten(item) : [item]);
  }

  return res;
};

export default flatten;
