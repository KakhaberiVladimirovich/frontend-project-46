import _ from 'lodash';

const buildTree = (data1, data2) => {
  const union = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(union);

  return sortedKeys.map((key) => {
    if (!Object.hasOwn(data1, key)) {
      return {
        name: key,
        type: 'added',
        value: data2[key],
      };
    }
    if (!Object.hasOwn(data2, key)) {
      return {
        name: key,
        type: 'deleted',
        value: data1[key],
      };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        name: key,
        type: 'nested',
        children: buildTree(data1[key], data2[key]),
      };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        name: key,
        type: 'changed',
        value1: data1[key],
        value2: data2[key],
      };
    }
    return {
      name: key,
      type: 'unchanged',
      value: data1[key],
    };
  });
};

export default buildTree;
