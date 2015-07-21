'use strict';

var worker;

describe('Basic YAMLWroker methods', function () {

  before(function () {
    worker = new YAMLWorker();
  });

  it('#load', function (done) {
    worker.load('val: 1', function (err, result) {
      expect(err).to.be.null;
      expect(result).to.deep.equal({val: 1});
      done();
    });
  });

  it('#compose', function (done) {
    worker.compose('val: 1', function (err, result) {
      expect(err).to.be.null;
      expect(result).to.have.property('tag');
      expect(result).to.have.property('value');
      done();
    });
  });

  it('#dump', function (done) {
    worker.dump({val:1}, function (err, result) {
      expect(err).to.be.null;
      expect(result).to.equal('val: 1\n');
      done();
    });
  });
});

describe('Errors', function () {
  var worker;

  before(function () {
    worker = new YAMLWorker();
  });

  it('calls the callback with an error for invalid YAML', function (done) {
    var invalidYaml = 'value: 1\n val: 2'; // bad indentation
    var yamlError = { // copied from jsyaml error thrown
      "name": "YAMLException",
      "reason": "bad indentation of a mapping entry",
      "mark": {
        "name": null,
        "buffer": "value: 1\n val: 2\n\u0000",
        "position": 13,
        "line": 1,
        "column": 4
      },
      "message": "JS-YAML: bad indentation of a mapping entry at line 2, column 5:\n     val: 2\n        ^"
    };
    worker.load(invalidYaml, function (error) {
      expect(error).to.not.be.null;
      expect(error).to.deep.equal(yamlError);
      done();
    });
  });
});

describe('Stress testing', function () {
  var worker;

  before(function () {
    worker = new YAMLWorker();
  });

  it('performs 2 async load operations', function (done) {
    var str1 = 'val1: 1\nval2: 2\nhash:\n  a: b\n  c: d';
    var str2 = 'val1: 3\nval2: 4\nhash:\n  e: f\n  g: h';
    var obj1 = {val1: 1, val2: 2, hash: {a: 'b', c: 'd'}};
    var obj2 = {val1: 3, val2: 4, hash: {e: 'f', g: 'h'}};

    worker.load(str1, function (err, res) {
      expect(err).to.be.null;
      expect(res).to.deep.equal(obj1);
    });
    worker.load(str2, function (err, res) {
      expect(err).to.be.null;
      expect(res).to.deep.equal(obj2);
    });

    setTimeout(done, 1000);
  });
});
