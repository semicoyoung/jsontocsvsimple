# csvtojsonsimple

- a simple module to help you convert json data to csv file to output to local directory
- 帮你把JSON数据转成一份CSV文件并导出到本地目录

#### install

```
npm install csvtojsonsimple --save
```
#### sample

```
let csvtojsonsimple = require('csvtojsonsimple');
let co = require('co');

let fileName = 'example';  //name of the export file
let header = ['aa', 'bb']; //header of the export file
let data = [{aa: 1, b: 1}, {aa:2, b:2}];

co(function* () {
yield csvtojsonsimple(fileName, header, data);
}).then(function () {}, function (err) {
console.log(err);
})

```

#### API

- exportCsv

- fileName: name of the csv file
- header: header fields of csv file
- data: json to convert

#### test

npm test

#### note
- if you want to change where the csv you want to output, change the value of fileFolder in the index.js correctly