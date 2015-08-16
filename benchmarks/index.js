var Benchmark = require('benchmark');
var naiveFlatten = require('../dist');
var lodashFlatten = require('lodash.flatten');

var suites = [
  [1, 2, 3, 4],
  [[1, 2, [3]], 4],
  [[[[[[]]]]], 1, 2, 3, [4, [5, [6, [[[7, 8, [9]]]]]]]]
].map(function (array) {
    var suite = new Benchmark.Suite('suite for: ' + JSON.stringify(array));

    suite
      .add('flatten', function () {
        naiveFlatten(array);
      })
      .add('lodash.flatten', function () {
        lodashFlatten(array, true);
      })
      .on('start', function () {
        console.log(this.name);
      })
      .on('cycle', function (event) {
        console.log(String(event.target));
      });

    return suite;
  });

Benchmark.invoke(suites, {
  name: 'run',
  onCycle: function () {
    console.log();
  }
});
