import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';
import { cwd } from 'node:process';

import parse from './parses.js';

const readFile = (newPath) => readFileSync(newPath, 'utf-8');
const getAbsolutePath = (filepath) => path.resolve(cwd(), filepath);
const file = (newFile) => readFile(getAbsolutePath(newFile));

const getData = (filepath) => parse(file(filepath));

const getDiffInformation = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const union = _.union(keys1, keys2);
  const sortUnion = _.sortBy(union);

  const getNewObj = sortUnion.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (!Object.hasOwn(obj1, key)) {
      return {
        type: 'added',
        key,
        value2,
      };
    }
    if (!Object.hasOwn(obj2, key)) {
      return {
        type: 'deleted',
        key,
        value1,
      };
    }
    if (value1 !== value2) {
      return {
        type: 'changed',
        key,
        value1,
        value2,
      };
    }
    return {
      type: 'unchanged',
      key,
      value1,
    };
  });

  return getNewObj;
};

const genDiff = (getNewDiffInformation) => {
  const getStringValue = getNewDiffInformation.map((obj) => {
    const typeDiff = obj.type;
    switch (typeDiff) {
      case 'deleted':
        return `- ${obj.key}: ${obj.value1}`;
      case 'unchanged':
        return `  ${obj.key}: ${obj.value1}`;
      case 'changed':
        return `- ${obj.key}: ${obj.value1}\n+ ${obj.key}: ${obj.value2}`;
      case 'added':
        return `+ ${obj.key}: ${obj.value2}`;
      default:
        return null;
    }
  });
  return `{\n${getStringValue.join('\n')}\n}`;
};

export default (filepath1, filepath2) => {
  const date1 = getData(filepath1);
  const date2 = getData(filepath2);
  return genDiff(getDiffInformation(date1, date2));
};
