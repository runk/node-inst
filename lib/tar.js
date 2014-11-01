
if (~process.platform.indexOf('win'))
  module.exports = require('./tar/win');
else
  module.exports = require('./tar/unix');
