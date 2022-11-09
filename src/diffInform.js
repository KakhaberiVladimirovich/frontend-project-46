import _ from 'lodash';

const getDiffInformation = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const union = _.union(keys1, keys2);
  const sortUnion = _.sortBy(union);

  const getNewObj = sortUnion.map((key) => {
    const values1 = obj1[key];
    const values2 = obj2[key];

    if (!Object.hasOwn(obj1, key)) {
      return {
        name: key,
        type: 'added',
        value: values2,
      };
    }
    if (!Object.hasOwn(obj2, key)) {
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
        children: getDiffInformation(values1, values2),
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

export default getDiffInformation;
