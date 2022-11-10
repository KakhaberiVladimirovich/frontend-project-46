import formStylish from './stylish.js';
import formPlain from './plain.js';
import formatJson from './json.js';

const result = {
  stylish: formStylish,
  plain: formPlain,
  json: formatJson,
};

const format = (tree, formatName) => result[formatName](tree);

export default format;
