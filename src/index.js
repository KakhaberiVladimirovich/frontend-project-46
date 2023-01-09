import { readFileSync } from 'fs';
import path from 'path';
import buildTree from './diffInform.js';
import format from './formatters/index.js';
import parse from './parses.js';

const readFile = (filepath) => readFileSync(filepath, 'utf-8');
const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const readAbsolutePath = (filepath) => readFile(getAbsolutePath(filepath));

const extractFormat = (filename) => path.extname(filename).slice(1);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1format = extractFormat(filepath1);
  const file2format = extractFormat(filepath2);
  const fileContent1 = readAbsolutePath(filepath1);
  const fileContent2 = readAbsolutePath(filepath2);
  const data1 = parse(file1format, fileContent1);
  const data2 = parse(file2format, fileContent2);
  const innerTree = buildTree(data1, data2);

  return format(innerTree, formatName);
};

export default genDiff;
