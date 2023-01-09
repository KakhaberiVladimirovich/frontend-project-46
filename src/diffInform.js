import _ from 'lodash';

const buildTree = (data1, data2) => {
  const union = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(union);

  const getNewObj = sortedKeys.map((key) => {
    const values1 = data1[key];
    const values2 = data2[key];

    if (!Object.hasOwn(data1, key)) {
      return {
        name: key,
        type: 'added',
        value: values2,
      };
    }
    if (!Object.hasOwn(data2, key)) {
      return {
        name: key,
        type: 'deleted',
        value: values1,
      };
    }
    if (_.isObject(values1) && _.isObject(values2)) {
      return {
        name: key,
        type: 'nested',
        children: buildTree(values1, values2),
      };
    }
    if (values1 !== values2) {
      return {
        name: key,
        type: 'changed',
        value1: values1,
        value2: values2,
      };
    }
    return {
      name: key,
      type: 'unchanged',
      value: values1,
    };
  });

  return getNewObj;
};

export default buildTree;
