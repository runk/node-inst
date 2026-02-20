var path = require('path'),
  fs = require('fs'),
  tar = require('tar');


exports.pack = function(dir, pkg, cb) {
  // this wrapper makes sure that callback called once only
  var called = false;
  var _cb = function(err) {
    !called && cb(err);
    called = true;
  }

  if (!fs.existsSync(path.dirname(pkg)))
    return cb(new Error('Destination directory not found'));
  if (!fs.existsSync(dir))
    return cb(new Error('Source directory not found'));

  tar.c({
    cwd: path.dirname(dir),
    file: pkg,
    portable: true
  }, [path.basename(dir)]).then(function() {
    _cb();
  }).catch(_cb);
};


exports.unpack = function(pkg, dir, cb) {
  // this wrapper makes sure that callback called once only
  var called = false;
  var _cb = function(err) {
    !called && cb(err);
    called = true;
  }

  tar.x({
    cwd: dir,
    file: pkg
  }).then(function() {
    _cb();
  }).catch(_cb);
};
