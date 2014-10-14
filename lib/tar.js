var path = require('path'),
    //  spawn = require('child_process').spawn,
    fstream = require('fstream'),
    fs = require('fs'),
    tar = require('tar');

exports.pack = function (dir, pkg, cb) {
    var dir_destination = fs.createWriteStream(pkg)

    // This must be a "directory"
    fstream.Reader({
        path: dir,
        type: "Directory"
    })
        .pipe(tar.Pack({
            noProprietary: true
        }))
        .pipe(dir_destination)
};

exports.unpack = function (pkg, dir, cb) {
    fs.createReadStream(pkg)
        .pipe(tar.Extract({
            path: dir
        }))
        .on("error", function (er) {
            console.error("error here")
        })
        .on("end", function () {
            console.error("done")
        })

};