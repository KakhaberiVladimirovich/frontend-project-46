import formStylish from './stylish.js';
import formPlain from './plain.js';

const result = {
  stylish: formStylish,
  plain: formPlain,
};

const format = (tree, formatName) => result[formatName](tree);

export default format;
