import { readFileSync } from 'fs';
import path from 'path';
import buildTree from './diffInform.js';
import format from './formatters/index.js';
import parse from './parses.js';

const readFile = (filepath) => readFileSync(filepath, 'utf-8');
const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const readAbsolutePath = (filepath) => readFile(getAbsolutePath(filepath));

const getData = (filepath) => parse(readAbsolutePath(filepath));

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const innerTree = buildTree(data1, data2);

  return format(innerTree, formatName);
};

export default genDiff;
