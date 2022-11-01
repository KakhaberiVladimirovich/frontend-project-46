import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const res = '{\n - follow : false\n   host : hexlet.io\n - proxy : 123.234.53.22\n - timeout : 50 \n + timeout : 20\n + verbose : true\n}';
test(genDiff, () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(res);
});


