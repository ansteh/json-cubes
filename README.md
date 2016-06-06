[![Build Status](https://api.travis-ci.org/ansteh/json-cubes.svg?branch=master)](https://travis-ci.org/ansteh/json-cubes)

slice and dice json

```js
'use strict';
const Cubes = require('json-cubes');
const Create = Cubes.Create;

let cube = Create.cube([
  ['name', 'amount'],
  [{ name: 'decision', value: 0 }, { name: 'track', value: 0 }]
]);

console.log(cube.get(['name', 'decision']));
console.log(cube.set(['name', 'decision'], 1));
console.log(cube.get(['name', 'decision']));
```

```js
'use strict';
const _ = require('lodash');
const Cubes = require('json-cubes');
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
```

## License

MIT © [Andre Stehle](https://github.com/ansteh)
