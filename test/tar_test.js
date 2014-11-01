var assert = require('assert'),
  fs = require('fs'),
  rimraf = require('rimraf');


describe('/lib/tar', function() {

  var tar = null;
  var cleanup = function() {
    rimraf.sync(__dirname + '/files/test2.tar');
    rimraf.sync(__dirname + '/files/test');
  };

  before(cleanup);
  after(cleanup);

  describe('unix', function() {

    before(function() { tar = require('../lib/tar/unix') });

    describe('unpack()', function() {
      it('should unpack tarball', function(done) {
        tar.unpack(__dirname + '/files/test.tar', __dirname + '/files', function(err) {
          if (err) return done(err);
          assert(fs.existsSync(__dirname + '/files/test'));
          done();
        });
      });

      it('should return error for invalid path', function(done) {
        tar.unpack('/whatever.tar', '/wwwwww', function(err) {
          assert(err);
          done();
        });
      });
    });


    describe('pack()', function() {
      it('should create new tarball', function(done) {
        tar.pack(__dirname + '/files/test', __dirname + '/files/test2.tar', function(err) {
          if (err) return done(err);
          assert(fs.existsSync(__dirname + '/files/test2.tar'));
          done();
        });
      });

      it('should return error for invalid path', function(done) {
        tar.pack('/whatever', '/whatever.tar', function(err) {
          assert(err);
          done();
        });
      });
    });

  });


  describe('win', function() {

    before(function() { tar = require('../lib/tar/win') });

    describe('unpack()', function() {
      it('should unpack tarball', function(done) {
        tar.unpack(__dirname + '/files/test.tar', __dirname + '/files', function(err) {
          if (err) return done(err);
          assert(fs.existsSync(__dirname + '/files/test'));
          done();
        });
      });

      it('should return error for invalid path', function(done) {
        tar.unpack('/whatever.tar', '/wwwwww', function(err) {
          assert(err);
          done();
        });
      });
    });


    describe('pack()', function() {
      it('should create new tarball', function(done) {
        tar.pack(__dirname + '/files/test', __dirname + '/files/test2.tar', function(err) {
          if (err) return done(err);
          assert(fs.existsSync(__dirname + '/files/test2.tar'));
          done();
        });
      });

      it('should return error for invalid path', function(done) {
        tar.pack('/whatever', '/whatever.tar', function(err) {
          assert(err);
          done();
        });
      });
    });

  });

});
