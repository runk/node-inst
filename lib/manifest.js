var crypto = require('crypto'),
  fs = require('fs');


exports.shasum = function(basepath, opts) {
  var manifests = [
    basepath + '/npm-shrinkwrap.json',
    basepath + '/package.json'
  ].filter(fs.existsSync).map(function(filepath) {
    return fs.readFileSync(filepath, 'utf8');
  });

  if (opts.production)
    manifests.push(['production: true'])

  if (manifests.length === 0)
    throw new Error('Cannot find any manifest files (package.json or npm-shrinkwrap.json)');

  var shasum = crypto.createHash('sha1');
  shasum.update(manifests.join());
  return shasum.digest('hex');
};
