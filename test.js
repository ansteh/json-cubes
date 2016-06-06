'use strict';
const Cubes = require('./index.js');
const Create = Cubes.Create;

let cube = Create.cube([
  ['name', 'amount'],
  [{ name: 'decision', value: 0 }, { name: 'track', value: 0 }]
]);

console.log(cube.get(['name', 'decision']));
console.log(cube.set(['name', 'decision'], 1));
console.log(cube.get(['name', 'decision']));


//console.log(cube.getValues());
