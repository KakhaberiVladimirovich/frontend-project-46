import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';
import { cwd } from 'node:process';

const getDiffInformation = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const union = _.union(keys1, keys2);
  const sortUnion = _.sortBy(union);

  const getNewObjekt = sortUnion.map((key) => {
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
      type: 'unchandeg',
      key,
      value1,
    };
  });

  return getNewObjekt;
};

const genDiff = (getDiffInformation) => {
  const getStringValue = getDiffInformation.map((obj) => {
    const typeDiff = obj.type;
    switch (typeDiff) {
      case 'deleted':
        return ` - ${obj.key} : ${obj.value1}`;
      case 'unchandeg':
        return `   ${obj.key} : ${obj.value1}`;
      case 'changed':
        return ` - ${obj.key} : ${obj.value1} \n + ${obj.key} : ${obj.value2}`;
      case 'added':
        return ` + ${obj.key} : ${obj.value2}`;
      default:
        return null;
    }
  });
  return `{\n${getStringValue.join('\n')}\n}`;
};

export default (filepath1, filepath2) => {
  const readFile = (path) => readFileSync(path, 'utf-8');
  const getAbsolutePath = (filepath) => path.resolve(cwd(), filepath);
  const dateParse = (file) => JSON.parse(file);

  const file = (file) => readFile(getAbsolutePath(file));

  const date1 = dateParse(file(filepath1));
  const date2 = dateParse(file(filepath2));

  return genDiff(getDiffInformation(date1, date2));
};
