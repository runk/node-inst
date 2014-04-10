var fs = require('fs'),
  npm = require('npm'),
  Storage = require('../lib/storage');


var handleError = function(err) {
  console.error('ERROR:', err);
  process.exit(1);
};


exports.run = function(opts) {
  var storage = new Storage(process.cwd(), opts);
  console.log('Manifest shasum: ' + storage.shasum);

  if (storage.exists())
    exports.fast(storage);
  else
    exports.fresh(storage);
};


exports.fresh = function(storage) {
  console.log('No tarballs were found, doing fresh install');
  var start = Date.now();
  var config = {};

  npm.load(config, function (err) {
    if (err) return handleError(err);

    var args = []
    npm.commands.install(args, function(err, data) {
      if (err) return handleError(err);
      storage.pack(function(err, res) {
        if (err) return handleError(err);
        console.log('Time spent: ' + Number((Date.now() - start) / 1000).toFixed(1) + ' secs');
      });
    })

    npm.on('log', function (message) {
      console.log('log:', message);
    });
  });
};


exports.fast = function(storage) {
  console.log('Tarball from previous install found, extracting');
  var start = Date.now();

  storage.unpack(function(err, res) {
    if (err) return handleError(err);
    console.log('Time spent: ' + Number((Date.now() - start) / 1000).toFixed(1) + ' secs');
  });
};
