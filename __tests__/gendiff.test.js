import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import { file1, file2, result } from '../src/file.js';

test('difference test 1', () => {
  expect(genDiff(file1, file2)).toEqual(result);
});
