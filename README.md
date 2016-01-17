node-inst
=========

Faster npm installs via caching whole `node_module` dir


If you do a lot of `npm i` every day you might be annoyed with its slowness. Even if you use built-in
npm cache it still compiles/rebuilds all binary dependencies. Another solutions such as caching proxies or
npm registry mirrors still consume a lot of time for networking / checking / compiling etc.

This module caches *whole* `node_modules` directory and uses check sum of manifest files (*package.json*
and *npm-shrinkwrap.json*), version of *node* and *npm* as a cache key. When you're doing fresh install 
it saves a tarball with all your dependencies and extract it next time when you do install. It's like 
**30-50** times faster than normal install even with "warm" npm cache.


## Installation

    npm install inst -g


## Usage

Instead of using `npm install` you use `inst`. That's it.

    $ inst --help

    Usage: inst [options]

    Options:

      -h, --help            output usage information
      -V, --version         output the version number
      -s, --storage [path]  storage path [~/.npm-inst-cache]
      -t, --ttl [second]    cache lifetime [86400]
      -p, --production      production mode, do not install dev dependencies [false]
