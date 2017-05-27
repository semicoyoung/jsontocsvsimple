# jsontocsvsimple

- a simple module to help you convert json data to csv file to output to local directory
- 帮你把JSON数据转成一份CSV文件并导出到本地目录

#### install

```
npm install jsontocsvsimple --save
```
#### sample

```
let jsontocsvsimple = require('jsontocsvsimple');
let co = require('co');

let fileName = 'example';  //name of the export file
let header = ['aa', 'bb']; //header of the export file
let data = [{aa: 1, b: 1}, {aa:2, b:2}];

co(function* () {
  yield jsontocsvsimple.expostCsv(fileName, header, data);
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
- if you want to change where the csv you want to output, change the value of fileFolder in the index.js (line 7) of the this module correctly
- if your file will be very big, maybe you need to change value of fileLimit in index.js (line 9) of this module corretcly
