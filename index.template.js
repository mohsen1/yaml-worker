// URL.createObjectURL
window.URL = window.URL || window.webkitURL;

function YAMLWorker() {
  var workerCode = function wrapper(){<%= workerCode %>};

  workerCode = workerCode.toString()
    .replace('function wrapper(){', '')
    .replace(/}$/, '');
  var blob;
  try {
      blob = new Blob([workerCode], {type: 'application/javascript'});
  } catch (e) { // Backwards-compatibility
      window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
      blob = new BlobBuilder();
      blob.append(response);
      blob = blob.getBlob();
  }
  this.worker = new Worker(URL.createObjectURL(blob));
}



var methods = [
  'load',
  'loadAll',
  'safeLoad',
  'safeLoadAll',
  'dump',
  'safeDump',
  'scan',
  'parse',
  'compose',
  'compose_all',
  'load_all',
  'emit',
  'serialize',
  'serialize_all',
  'dump_all'
];

methods.forEach(function (method) {

  YAMLWorker.prototype[method] = function (arg, cb) {
    this.worker.onmessage = function(message) {
      cb(null, JSON.parse(message.data));
    };
    this.worker.onerror = cb;
    this.worker.postMessage([method, arg]);
  };
});
