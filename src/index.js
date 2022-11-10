import { readFileSync } from 'fs';
import path from 'path';
import { cwd } from 'node:process';
import getDiffInformation from './diffInform.js';
import format from './formatters/index.js';
import parse from './parses.js';

const readFile = (filepath) => readFileSync(filepath, 'utf-8');
const getAbsolutePath = (filepath) => path.resolve(cwd(), filepath);
const file = (filepath) => readFile(getAbsolutePath(filepath));

const getData = (filepath) => parse(file(filepath));

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const date1 = getData(filepath1);
  const date2 = getData(filepath2);
  const diff = getDiffInformation(date1, date2);

  return format(diff, formatName);
};

export default genDiff;
