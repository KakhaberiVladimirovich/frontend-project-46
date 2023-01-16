import { readFileSync } from 'fs';
import path from 'path';
import buildTree from './buildTree.js';
import format from './formatters/index.js';
import parse from './parse.js';

const readFile = (filepath) => readFileSync(path.resolve(process.cwd(), filepath.trim()), 'utf-8');

const extractFormat = (filename) => path.extname(filename).slice(1);

const getData = (filepath) => parse(readFile(filepath), (extractFormat(filepath)));

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);

  const innerTree = buildTree(data1, data2);

  return format(innerTree, formatName);
};

export default genDiff;
