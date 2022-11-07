import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import { getFixturePath, result } from '../src/file.js';

const file1 = getFixturePath('file1.json');
const file2 = getFixturePath('file2.json');
const file3 = getFixturePath('file1.yaml');
const file4 = getFixturePath('file2.yaml');

test('difference test 1', () => {
  expect(genDiff(file1, file2)).toEqual(result);
});

test('difference test 2', () => {
  expect(genDiff(file3, file4)).toEqual(result);
});
