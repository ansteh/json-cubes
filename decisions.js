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
    add: collection.add,
    variationsOf: collection.variationsOf
  };
};

let decisions = Decisions(['a', 'b'], ['1', '2', '3']);

let cube;
cube = decisions.add();
cube.set(['a', '1'], 1);

cube = decisions.add();
cube.set(['a', '1'], 0);

cube = decisions.add();
cube.set(['a', '1'], 5);

console.log(decisions.variationsOf(['a', '1']));
console.log(decisions.variationsOf(['a', '3']));
