var assert = require('assert'),
  fs = require('fs'),
  manifest = require('../lib/manifest');


describe('/lib/manifest', function() {

  describe('shasum()', function() {
    it('should return check sum', function() {
      assert.equal(manifest.shasum(__dirname + '/files/module', {}), '7d272278fae80d6da9680bef7fb7b92adba46466')
    });

    it('should return check sum (production)', function() {
      assert.equal(manifest.shasum(__dirname + '/files/module', {production: true}),
        'd4f1f2e7336ba825047cfd679ef90745353e964d')
    });

    it('should return error when no manifests can be found', function() {
      assert.throws(function() {
        manifest.shasum(__dirname);
      })
    });
  });

});
