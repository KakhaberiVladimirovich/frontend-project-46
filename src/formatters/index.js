import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js';

const result = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJson,
};

const format = (tree, formatName) => result[formatName](tree);

export default format;
