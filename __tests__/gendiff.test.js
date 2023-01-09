import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';

import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const stylish = readFile('stylish.txt');
const plain = readFile('plain.txt');
const json = readFile('json.txt');
const format = ['json', 'yaml', 'yml'];

test.each(format)('Check different file formats', (extension) => {
  const fileName1 = `${process.cwd()}/__fixtures__/file1.${extension}`;
  const fileName2 = `${process.cwd()}/__fixtures__/file2.${extension}`;

  expect(genDiff(fileName1, fileName2, 'stylish')).toEqual(stylish);
  expect(genDiff(fileName1, fileName2, 'plain')).toEqual(plain);
  expect(genDiff(fileName1, fileName2, 'json')).toEqual(json);
  expect(genDiff(fileName1, fileName2)).toEqual(stylish);
});
