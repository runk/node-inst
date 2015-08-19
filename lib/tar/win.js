var path = require('path'),
  fs = require('fs'),
  tar = require('tar'),
  fstream = require('fstream');


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

  var dest = fs.createWriteStream(pkg);

  var packer = tar.Pack({noProprietary: true})
    .on('error', _cb)
    .on('end', _cb);

  fstream.Reader({path: dir, type: 'Directory'})
    .pipe(packer)
    .pipe(dest)
    .on('error', _cb)
    .on('end', _cb);
};


exports.unpack = function(pkg, dir, cb) {
  // this wrapper makes sure that callback called once only
  var called = false;
  var _cb = function(err) {
    !called && cb(err);
    called = true;
  }

  var extractor = tar.Extract({path: dir})
    .on('error', _cb)
    .on('end', _cb);

  fs.createReadStream(pkg)
    .on('error', _cb)
    .pipe(extractor);
};
