'use strict';

describe('YAML Wroker', function () {

  var YAMLWoker;

  it('creates the worker', function() {
    var error;

    try {
      YAMLWoker = new Worker('base/browser.js');
    } catch(err) {
      error = err;
    }

    expect(error).to.be.undefined;
  })

  it('#load', function (done) {

    YAMLWoker.onmessage = function (message) {
      var result = JSON.parse(message.data);
      expect(result).to.deep.equal({val: 1});
      done();
    };

    YAMLWoker.postMessage(['load', 'val: 1']);
  });

  it('#compose', function (done) {

    YAMLWoker.onmessage = function (message) {
      var result = JSON.parse(message.data);
      expect(result).to.have.property('tag');
      expect(result).to.have.property('value');
      done();
    };

    YAMLWoker.postMessage(['compose', 'val: 1']);
  })
})
