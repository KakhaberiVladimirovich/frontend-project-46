import _ from 'lodash';

const replacer = '  ';
const spacesCount = 2;
const getIndent = (depth, spaces) => replacer.repeat(depth * spacesCount - spaces);

const stringify = (val, depth) => {
  if (!_.isObject(val)) {
    return String(val);
  }

  const result = Object.entries(val).map(([key, value]) => {
    if (!_.isObject(value)) {
      return `${getIndent(depth, 1)}  ${key}: ${value}`;
    }

    return `${getIndent(depth, 1)}  ${key}: ${stringify(value, depth + 1)}`;
  });

  return ['{', ...result, `${getIndent(depth, spacesCount)}}`].join('\n');
};

const formatStylish = (tree, depth = 1) => {
  const items = tree.map((item) => {
    const value = stringify(item.value, depth + 1);

    switch (item.type) {
      case 'added':
        return `${getIndent(depth, 1)}+ ${item.name}: ${value}`;
      case 'deleted':
        return `${getIndent(depth, 1)}- ${item.name}: ${value}`;
      case 'unchanged':
        return `${getIndent(depth, 1)}  ${item.name}: ${value}`;
      case 'changed':
        return `${getIndent(depth, 1)}- ${item.name}: ${stringify(item.value1, depth + 1)}\n${getIndent(depth, 1)}+ ${item.name}: ${stringify(item.value2, depth + 1)}`;
      case 'nested':
        return `${getIndent(depth, 1)}  ${item.name}: ${formatStylish(item.children, depth + 1)}`;
      default:
        throw new Error('Unknown type.');
    }
  });
  return ['{', ...items, `${getIndent(depth, spacesCount)}}`].join('\n');
};

export default formatStylish;
