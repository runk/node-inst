var crypto = require('crypto'),
  fs = require('fs'),
  path = require('path');

// Load npm version directly from its package.json instead of requiring 'npm/package'
// which is no longer exported in npm 12+
var npmPackagePath = path.join(path.dirname(require.resolve('npm')), 'package.json');
var npm = { version: JSON.parse(fs.readFileSync(npmPackagePath, 'utf8')).version };

exports.shasum = function(basepath, opts) {
  var manifests = [
    basepath + '/npm-shrinkwrap.json',
    basepath + '/package.json',
    process.version,
    npm.version
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
