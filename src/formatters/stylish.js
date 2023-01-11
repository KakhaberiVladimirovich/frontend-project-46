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
    const makeLine = (value, mark) => `${getIndent(depth, 1)}${mark} ${item.name}: ${stringify(value, depth, replacer)}`;

    switch (item.type) {
      case 'added':
        return `${getIndent(depth, 1)}+ ${item.name}: ${stringify(item.value, depth + 1)}`;
      case 'deleted':
        return `${getIndent(depth, 1)}- ${item.name}: ${stringify(item.value, depth + 1)}`;
      case 'unchanged':
        return `${getIndent(depth, 1)}  ${item.name}: ${stringify(item.value, depth + 1)}`;
      case 'changed':
        return [`${makeLine(item.value1, '-')}`,
          `${makeLine(item.value2, '+')}`].join('\n');
      case 'nested':
        return `${getIndent(depth, 1)}  ${item.name}: ${formatStylish(item.children, depth + 1)}`;
      default:
        throw new Error('Unknown type.');
    }
  });
  return ['{', ...items, `${getIndent(depth, spacesCount)}}`].join('\n');
};

export default formatStylish;
