var YAMLJS = require('yaml-js');
var JSYAML = require('js-yaml');

/**
 * Worker message listener.
 *
 * @param  {object} message Web Workr message object
 *
 * # Message format:
 * `message` is an array. first argument in the array is the method name string
 * and the rest of items are arguments to that method
 */
onmessage = function onmessage(message) {

  if (!Array.isArray(message.data) || message.data.length < 2) {
    throw new TypeError('data should be an array with method and arguments');
  }

  var method = message.data[0];
  var args =message.data.slice(1);
  var result = null;
  var YAML;

  // select YAML engine based on method name
  if (method === 'compose_all' || method === 'compose') {
    YAML = YAMLJS;
  } else {
    YAML = JSYAML;
  }

  if (typeof YAML[method] === 'function') {
    result = YAML[method].apply(null, args);
  } else {
    throw new TypeError('unknown method name');
  }

  postMessage(JSON.stringify(result));
};
