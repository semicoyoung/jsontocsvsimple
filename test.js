'use strict';

let co = require('co');
let jsontocsvsimple = require('./index');
let Jsontocsvsimple = new jsontocsvsimple();

let fileName = 'hehe';
let header = ['bb', 'aaa'];
let data = [{aa:1, bb:2}, {aa:1, bb:2}];

co(function* () {
  yield Jsontocsvsimple.expostCsv(fileName, header, data);
}).then(function () {}, function (err) {
  console.log(err);
});