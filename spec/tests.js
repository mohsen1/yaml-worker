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
    YAMLWoker.postMessage(['load', 'val: 1']);

    YAMLWoker.onmessage = function (message) {
      expect(message.data).to.deepEqual({val: 1});
      done();
    };
  });
})
