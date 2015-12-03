/**
 * Created by roxana on 28.11.2015.
 */
var configuration = require('../configuration.json'),
    walk = require('walk'),
    path = require('path'),
    options = {
        followLinks: false
        // directories with these keys will be skipped
        , filters: ["node_modules"]
    },
    walker = walk.walk(configuration.rootApp,options),
    Promise = require('promised-io/promise'),
    fs = require('fs'),
    archaieusCache = {};


function resolve(fileName) {
    fileName = fileName.replace('/', '');
    console.log('Searching file with name:' + fileName);

    if (!archaieusCache[fileName]) {
        var deferred = Promise.defer();
        walker.on("file", function (root, fileStat, next) {
            fs.readFile(path.resolve(root, fileStat.name), function (buffer) {
                if (fileStat.name == fileName) {
                    console.log('Found page ' + root);
                }
                next();
            });
        });

        archaieusCache[fileName] = deferred.promise;
    }


    return archaieusCache[fileName];
}

//TODO
function fileWalk(fileName) {
    var deferred = Promise.defer();


    return deferred.promise;
}

//TODO
function fileWalk(root, fileStat, fileName, next) {
    var deferred = Promise.defer();

    return deferred.promise;
}

function readFile(file) {
    var deferred = Promise.defer();
    fs.readFile(file, 'utf8', function(err, data) {
        if(err) {
            deferred.reject(err);
        } else {
            deferred.resolve(data);
        }
    });
    return deferred.promise;
}


exports.resolve = resolve;