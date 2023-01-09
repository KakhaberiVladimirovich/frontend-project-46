import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';

import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const cases = [
  ['file1.json', 'file2.json', 'json.txt', 'json'],
  ['file1.yml', 'file2.yml', 'stylish.txt', 'stylish'],
  ['file1.json', 'file2.json', 'stylish.txt', 'stylish'],
  ['file1.json', 'file2.json', 'plain.txt', 'plain'],
];

test.each(cases)('Check different file formats', (firstArg, secondArg, expectedResult, format) => {
  const firstFile = getFixturePath(firstArg);
  const secondFile = getFixturePath(secondArg);
  const getResult = readFile(expectedResult);
  const result = genDiff(firstFile, secondFile, format);
  expect(result).toEqual(getResult);
});
