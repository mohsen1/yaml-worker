'use strict';

var worker;

describe('YAML Wroker', function () {

  before(function () {
    worker = new YAMLWorker();
  })

  it('#load', function (done) {
    worker.load('val: 1', function (err, result) {
      expect(err).to.be.null;
      expect(result).to.deep.equal({val: 1});
      done();
    })
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
})
