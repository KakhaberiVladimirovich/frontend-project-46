import { readFileSync } from 'fs';
import path from 'path';
import { cwd } from 'node:process';
import getDiffInformation from './diffInform.js';
import stylish from './formatters/stylish.js';
import parse from './parses.js';

const readFile = (newPath) => readFileSync(newPath, 'utf-8');
const getAbsolutePath = (filepath) => path.resolve(cwd(), filepath);
const file = (newFile) => readFile(getAbsolutePath(newFile));

const getData = (filepath) => parse(file(filepath));

const lol = (filepath1, filepath2) => {
  const date1 = getData(filepath1);
  const date2 = getData(filepath2);
  const lox = getDiffInformation(date1, date2);

  return stylish(lox);
};

export default lol;
