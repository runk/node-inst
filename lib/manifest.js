var crypto = require('crypto'),
  fs = require('fs');


exports.shasum = function(basepath) {
  var manifests = [
    basepath + '/npm-shrinkwrap.json',
    basepath + '/package.json'
  ].filter(fs.existsSync).map(function(filepath) {
    return fs.readFileSync(filepath, 'utf8');
  });

  if (manifests.length === 0)
    throw new Errors('Cannot find any manifest files (package.json or npm-shrinkwrap.json)');

  var shasum = crypto.createHash('sha1');
  shasum.update(manifests.join());
  return shasum.digest('hex');
};
