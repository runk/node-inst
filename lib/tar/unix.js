var path = require('path'),
  spawn = require('child_process').spawn;


var exec = function(cmd, cb) {
  var stderr = '';
  cmd.stderr.on('data', function(data) {
    stderr += data;
  });
  cmd.on('close', function(code) {
    if (code === 0)
      return cb();
    cb(new Error(stderr));
  });
};


exports.pack = function(dir, pkg, cb) {
  var cmd = spawn('tar', ['-cf', pkg, '-C', path.dirname(dir), path.basename(dir)]);
  exec(cmd, cb);
};


exports.unpack = function(pkg, dir, cb) {
  var cmd = spawn('tar', ['-xf', pkg, '-C', dir]);
  exec(cmd, cb);
};
