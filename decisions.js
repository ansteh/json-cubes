'use strict';
const _ = require('lodash');
const Cubes = require('./index.js');
const Create = Cubes.Create;

const Decisions = (xAxis, yAxis) => {
  yAxis = _.map(yAxis, (name) => {
    return { name: name, value: 0 };
  });

  let collection = Create.collection([xAxis, yAxis]);

  return {
    addCube: collection.add,
    variationsOf: collection.variationsOf
  };
};

let decisions = Decisions(['a', 'b'], ['1', '2', '3']);

let cube;
cube = decisions.addCube();
cube.set(['a', '1'], 1);
cube.set(['a', '2'], 1);

cube = decisions.addCube();
cube.set(['a', '1'], 0);

cube = decisions.addCube();
cube.set(['a', '1'], 5);

console.log(decisions.variationsOf(['a', '1']));
console.log(decisions.variationsOf(['a', '3']));
