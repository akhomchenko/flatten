import {expect} from 'chai';
import flatten from '../lib';

const pair = (before, after) => ({before, after});

describe('Flatten', () => {
  it('should return empty array if undefined is passed', () => {
    expect(flatten()).to.eql([]);
  });

  it('should return empty array if null is passed', () => {
    expect(flatten(null)).to.eql([]);
  });

  [{}, 42, 'string', () => {}].forEach(
      param => it(`should return array from ${typeof param}`, () => {
      expect(flatten(param)).to.eql([param]);
    }));

  it('should return the same array if it is already flat', () => {
    expect(flatten([1, 2, 3])).to.eql([1, 2, 3]);
  });

  [
    pair([[1], [2], [3]], [1, 2, 3]),
    pair([1, [2, 3]], [1, 2, 3]),
    pair([[[[]]], [1, [[[2]]]], [3]], [1, 2, 3]),
    pair([[1, 2, [3]], 4], [1, 2, 3, 4])
  ].forEach(({before, after}) =>
      it(`should return ${JSON.stringify(after)} from ` +
        `${JSON.stringify(before)}`, () =>
        expect(flatten(before)).to.eql(after)));

  it('should skip empty nested arrays', () => {
    expect(flatten([1, 2, [], 3, [4, []]])).to.eql([1, 2, 3, 4]);
  });
});
