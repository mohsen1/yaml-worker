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
  this.queue = [];
  this.worker.onmessage = this.onmessage.bind(this);
  this.worker.onerror = this.onerror.bind(this);
}

[
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
].forEach(function (method) {
  YAMLWorker.prototype[method] = function (arg, cb) {
    this.queue.push({
      method: method,
      arg: arg,
      cb: cb
    });
    this.enqueue();
  };
});

YAMLWorker.prototype.enqueue = function() {

  // if queue is empty do nothing.
  if (!this.queue.length) {
    return;
  }

  // if there is a currentTask do nothing
  if (this.currentTask) {
    return;
  }

  this.currentTask = this.queue.shift();
  this.worker.postMessage([this.currentTask.method, this.currentTask.arg]);
};

YAMLWorker.prototype.onmessage = function(message) {
  if (message.data.error) {
    this.currentTask.cb(message.data.error);
  } else {
    this.currentTask.cb(null, message.data.result);
  }
  this.currentTask = null;
  this.enqueue();
};

YAMLWorker.prototype.onerror = function(error) {
  this.currentTask.cb(error);
  this.currentTask = null;
  this.enqueue();
};
