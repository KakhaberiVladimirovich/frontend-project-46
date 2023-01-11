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
    const data1 = (singes) => `${getIndent(depth, 1)}${singes} ${item.name}: `;
    const data2 = (itemValue) => stringify(itemValue, depth + 1);
    switch (item.type) {
      case 'added':
        return `${data1('+')}${data2(item.value)}`;
      case 'deleted':
        return `${data1('-')}${data2(item.value)}`;
      case 'unchanged':
        return `${data1(' ')}${data2(item.value)}`;
      case 'changed':
        return `${data1('-')}${data2(item.value1)}\n${data1('+')}${data2(item.value2)}`;
      case 'nested':
        return `${data1(' ')}${formatStylish(item.children, depth + 1)}`;
      default:
        throw new Error('Unknown type.');
    }
  });
  return ['{', ...items, `${getIndent(depth, spacesCount)}}`].join('\n');
};

export default formatStylish;
