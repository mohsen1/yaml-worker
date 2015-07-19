# YAML Worker

> JS-YAML and YAML-JS wrapper with Worker API

#### Installation

Install using Bower or npm

```
npm install --save yaml-worker
```


```
bower install --save yaml-worker
```

#### Usage

When calling `postMessage`, pass an array which first element in array is the method name and the rest are arguments for that method.

```js
var YAMLWorker = new Worker('/path/to/yaml-worker.js');

YAMLWorker.postMessage(['load', 'value: 1']);

YAMLWorker.onmessage = function(message) {
  console.log('Result is ', message.data);
};
```

### License
MIT
