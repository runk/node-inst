var fs = require('fs'),
  npm = require('npm'),
  Storage = require('../lib/storage');


var handleError = function(err) {
  console.error('ERROR:', err);
  process.exit(1);
};

var log = function(message) {
  console.log('[inst]', message);
};


exports.run = function(opts) {
  var storage = new Storage(process.cwd(), opts);
  storage.init();

  log('Manifest shasum: ' + storage.shasum);
  log('Cache dir: ' + opts.storage);

  if (storage.exists())
    exports.fast(storage);
  else
    exports.fresh(storage, opts.production);
};


exports.fresh = function(storage, isProduction) {
  log('No tarballs were found, doing fresh install');
  var start = Date.now();
  var config = {};

  npm.load(config, function (err) {
    if (err) return handleError(err);

    npm.config.set('production', isProduction)

    var args = []
    npm.commands.install(args, function(err, data) {
      if (err) return handleError(err);
      log('Fresh npm install was successful, making a tarball');
      storage.pack(function(err, res) {
        if (err) return handleError(err);
        log('Time spent: ' + Number((Date.now() - start) / 1000).toFixed(1) + ' secs');
      });
    })

    npm.on('log', log);
  });
};


exports.fast = function(storage) {
  log('Tarball from previous install found, extracting');
  var start = Date.now();

  storage.unpack(function(err, res) {
    if (err) return handleError(err);
    log('Time spent: ' + Number((Date.now() - start) / 1000).toFixed(1) + ' secs');
  });
};
