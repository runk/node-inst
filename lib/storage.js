var fs = require('fs'),
  tar = require('./tar'),
  manifest = require('./manifest');


function Storage (basepath, opts) {
  this.basepath = basepath;
  this.opts = opts || {};
}


Storage.prototype.init = function() {
  if (!fs.existsSync(this.opts.storage))
    fs.mkdirSync(this.opts.storage, 0755);

  this.shasum = manifest.shasum(this.basepath);
  this.path = this.opts.storage + '/' + this.shasum + '.tar';
};


Storage.prototype.exists = function() {
  return fs.existsSync(this.path);
};


Storage.prototype.pack = function(cb) {
  tar.pack(this.basepath + '/node_modules', this.path, cb);
};


Storage.prototype.unpack = function(cb) {
  tar.unpack(this.path, this.basepath, cb);
};


Storage.prototype.gc = function(cb) {
  var dir = this.opts.storage;
  var threshold = Date.now() - this.opts.ttl * 1000;

  fs.readdirSync(dir).filter(function(name) {
    return /.tar$/.test(name);
  }).filter(function(name) {
    var stat = fs.lstatSync(dir + '/' + name);
    return stat.atime < threshold;
  }).forEach(function(name) {
    fs.unlinkSync(dir + '/' + name);
  });
};


module.exports = Storage;
