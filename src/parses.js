import yaml from 'js-yaml';

const parse = (format, data) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.load(data);
    default:
      throw new Error(`unknown format: ${format}`);
  }
};

export default parse;
