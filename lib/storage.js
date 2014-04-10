var fs = require('fs'),
  tar = require('./tar'),
  manifest = require('./manifest');


function Storage (basepath, opts) {
  this.basepath = basepath;
  this.opts = opts || {};

  if (!fs.existsSync(this.opts.storage))
    fs.mkdirSync(this.opts.storage, 0755);

  this.shasum = manifest.shasum(basepath);
  this.path = this.opts.storage + '/' + this.shasum + '.tar';
}


Storage.prototype.exists = function() {
  return fs.existsSync(this.path);
};


Storage.prototype.pack = function(cb) {
  tar.pack(this.basepath + '/node_modules', this.path, cb);
};


Storage.prototype.unpack = function(cb) {
  tar.unpack(this.path, this.basepath, cb);
};


module.exports = Storage;
