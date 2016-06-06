'use strict';
const _ = require('lodash');

const Collection = (layers) => {
  let cubes = [];

  let add = () => {
    let cube = Create.cube(layers);
    cubes.push(cube);
    return cube;
  };

  let variationsOf = (path) => {
    return _.map(cubes, cube => cube.get(path));
  };

  return {
    add: add,
    variationsOf: variationsOf
  };
};

const Cube = (layers) => {
  let values = {};

  _.forEach(layers, (layer) => {
    layer.bindTo(values);
  });

  let getValuepath = (path) => {
    return _.concat(path, ['value']);
  };

  let get = (path) => {
    return _.get(values, getValuepath(path));
  };

  let set = (path, value) => {
    return _.set(values, getValuepath(path), value);
  };

  return {
    getValues: () => values,
    get: get,
    set: set
  };
};

const Layer = (entities) => {

  let bindTo = (values) => {
    let keys = _.keys(values);
    if(keys.length > 0) {
      _.forEach(keys, (key) => {
        bindTo(values[key]);
      });
    } else {
      _.forEach(entities, (entity) => {
        values[entity.getKey()] = {};
        if(entity.hasValue()) {
          values[entity.getKey()]['value'] = entity.getValue();
        }
      });
    }
  };

  return {
    getEntities: () => entities,
    bindTo: values =>  bindTo(values)
  };
};

const Entity = (options) => {
  let name, value;

  if(_.isString(options)) name = options;

  if(_.isObject(options)){
    name = options.name;
    value = options.value;
  }

  let key = _.camelCase(name);

  let hasValue = () => {
    return _.isUndefined(value) === false;
  };

  return {
    getName: () => name,
    getKey: () => key,
    hasValue: hasValue,
    getValue: () => value
  };
};

const Create = {};

Create.collection = (layers) => {
  return Collection(layers);
};

Create.cube = (layers) => {
  return Cube(_.map(layers, entities => Create.layer(entities)));
};

Create.layer = (entities) => {
  return Layer(_.map(entities, options => Create.entity(options)));
};

Create.entity = (options) => {
  return Entity(options);
};

module.exports = {
  Create: Create
};
