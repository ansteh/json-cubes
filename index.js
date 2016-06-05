'use strict';
const _ = require('lodash');

const Entity = (name) => {
  let key = _.camelCase(name);

  return {
    getName: () => name,
    getKey: () => key
  };
};

const Layer = (entities) => {

  let bindTo = (values) => {
    _.forEach(entities, (entity) => {
      values[entity.getKey()] = {};
    });
  };

  return {
    getEntities: () => entities,
    bindTo: () => bindTo
  };
};

const Cube = (layers) => {
  let values = {};

  _.forEach(layers, (layer) => {
    layer.bindTo(values);
  });

  let add = (point) => {
    path:
  };

  return {

  };
};
