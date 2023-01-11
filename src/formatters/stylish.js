import _ from 'lodash';

const replacer = '  ';
const spacesCount = 2;

const openBracket = (depth) => replacer.repeat(depth * spacesCount - 1);
const closeBracket = (depth) => replacer.repeat(depth * spacesCount - spacesCount);

const stringify = (val, depth) => {
  if (!_.isObject(val)) {
    return String(val);
  }

  const result = Object.entries(val).map(([key, value]) => {
    if (!_.isObject(value)) {
      return `${openBracket(depth)}  ${key}: ${value}`;
    }

    return `${openBracket(depth)}  ${key}: ${stringify(value, depth + 1)}`;
  });

  return ['{', ...result, `${closeBracket(depth)}}`].join('\n');
};

const formatStylish = (tree, depth = 1) => {
  const items = tree.map((item) => {
    const value = stringify(item.value, depth + 1);

    switch (item.type) {
      case 'added':
        return `${openBracket(depth)}+ ${item.name}: ${value}`;
      case 'deleted':
        return `${openBracket(depth)}- ${item.name}: ${value}`;
      case 'unchanged':
        return `${openBracket(depth)}  ${item.name}: ${value}`;
      case 'changed':
        return `${openBracket(depth)}- ${item.name}: ${stringify(item.value1, depth + 1)}\n${openBracket(depth)}+ ${item.name}: ${stringify(item.value2, depth + 1)}`;
      case 'nested':
        return `${openBracket(depth)}  ${item.name}: ${formatStylish(item.children, depth + 1)}`;
      default:
        throw new Error('Unknown type.');
    }
  });
  return ['{', ...items, `${closeBracket(depth)}}`].join('\n');
};

export default formatStylish;
