import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const getFormat = (innerTree, format) => {
  switch (format) {
    case 'stylish':
      return formatStylish(innerTree);
    case 'plain':
      return formatPlain(innerTree);
    case 'json':
      return JSON.stringify(innerTree, null, ' '.repeat(2));
    default:
      throw new Error(`format not supported: ${format}`);
  }
};
export default getFormat;
