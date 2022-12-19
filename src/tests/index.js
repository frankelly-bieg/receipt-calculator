// run all files in this directory execpt this one with ES6 syntax
import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();
const testsDir = path.join(__dirname, 'src', 'tests');

fs.readdirSync(testsDir).forEach(file => {
  if (file !== 'index.js' && file.endsWith('.test.js')) {
    const filePath = path.join(testsDir, file);

    // console.log(`=======> Running test file: ${filePath}\n`);
    import(filePath);
  }
});
