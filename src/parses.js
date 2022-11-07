import yaml from 'js-yaml';

const parse = (filepath) => {
  if (filepath.extname === '.json') {
    JSON.parse(filepath);
  }
  return yaml.load(filepath);
};

export default parse;
