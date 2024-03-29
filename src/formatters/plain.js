import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : String(value);
};

const formatPlain = (tree) => {
  const iter = (value, path) => {
    const result = value
      .map((obj) => {
        const data = [...path, obj.name];
        const str = data.join('.');

        switch (obj.type) {
          case 'added':
            return `Property '${str}' was added with value: ${stringify(obj.value)}`;
          case 'deleted':
            return `Property '${str}' was removed`;
          case 'changed':
            return `Property '${str}' was updated. From ${stringify(obj.value1)} to ${stringify(obj.value2)}`;
          case 'nested':
            return iter(obj.children, data);
          case 'unchanged':
            return null;
          default:
            throw new Error('Unknown type');
        }
      })
      .filter((val) => val !== null);
    return result.join('\n');
  };
  return iter(tree, []);
};

export default formatPlain;
