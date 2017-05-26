'use strict';

let csv = require('csv');
let fs =require('fs');
let thunkify = require('thunkify-wrap');

let fileFolder = '../../';
let fileExt = '.csv';
const fileLimit = 1000000000000;

let jsontocsvsimple = function () {};

let csvStringify = thunkify(function (input, next) {
  for (let i = 0, li = input.length; i < li; ++i) {
    for (let j = 0, lj = input[i].length; j < lj; ++j) {
      input[i][j] = ' ' + input[i][j] + ' ';
    }
  }
  csv.stringify(input, next);
});

let writeFirstLine = function* (path, headers) {
  let firstLine = yield csvStringify([headers]);
  let bom = new Buffer('\xEF\xBB\xBF', 'binary');
  fs.writeFileSync(path, bom, 0, bom.length);
  fs.appendFileSync(path, firstLine);
};

let writeDataLines = function* (fileName, data, headers) {
  try{
    let dir = fs.readdirSync(fileFolder);
    let existingFile = false;
    let path = '';
    for (let i = 0; i < dir.length; ++i) {
      path = fileFolder + dir[i];
      if (dir[i].indexOf('.csv') !== -1 && fs.statSync(path).size <= fileLimit) {
        existingFile = true;
        break;
      }
    }
    if (!existingFile) {
      path = fileFolder + fileName + fileExt;
      yield writeFirstLine(path, headers);
    }

    fs.appendFileSync(path, data.join(''));
  }
  catch (e) {
    console.log(e.stack);
    return false;
  }
  return true;
};

jsontocsvsimple.prototype.expostCsv = function* (fileName, headers, data) {
  let results = [];
  for (let i = 0, len = data.length; i < len; i++) {
    let line = data[i];
    let dataLine = [];
    for (let key in line) {
      dataLine.push(line[key]);
    }
    results.push(yield csvStringify([dataLine]));

    if (results.length >= 100) {
      if (!(yield writeDataLines(fileName, results, headers))) {
        return false;
      }
      results = [];
    }
  }

  if (results.length) {
    if (!(yield writeDataLines(fileName, results, headers))) {
      return false;
    }
  }
  return true;
};

module.exports = jsontocsvsimple;
