describe('YAML Wroker', function () {
  var YAMLWoker = new Worker('../browser.js');

  it('#load', function (done) {
    YAMLWoker.postMessage(['load', 'val: 1']);

    YAMLWoker.onmessage = function (message) {
      done();
    };
  });
})
