var assert = require('assert'),
  fs = require('fs'),
  rimraf = require('rimraf'),
  Storage = require('../lib/storage');


describe('/lib/storage', function() {

  describe('gc()', function() {
    var base = __dirname + '/cache-dir';

    beforeEach(function(done) {
      rimraf.sync(base);

      fs.mkdirSync(base, 0755);
      fs.writeFileSync(base + '/1.tar', 'data');
      setTimeout(function() {
        fs.writeFileSync(base + '/2.tar', 'data');
        done();
      }, 1001);
    });

    after(function() {
      rimraf.sync(base);
    });


    it('should remove `1.tar` file', function() {
      s = new Storage(base, {storage: base, ttl: 1});
      s.gc();
      assert.deepEqual(fs.readdirSync(base), ['2.tar']);
    });

  });

});
