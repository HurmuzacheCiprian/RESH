/**
 * Created by roxana on 28.11.2015.
 */
var configuration = require('../configuration.json'),
    walk = require('walk'),
    path = require('path'),
    walker = walk.walk(configuration.rootApp),
    Promise = require('promised-io/promise'),
    fs = require('fs'),
    archaieusCache = {};



function resolve(fileName) {
    fileName = fileName.replace('/','');
    console.log('Searching file with name:'+fileName);
    var defered = Promise.defer();

    if(!archaieusCache[fileName]) {
        walker.on("file", function(root, fileStat, next) {
            fs.readFile(path.resolve(root, fileStat.name),'utf8', function (buffer) {
                if(fileStat.name == fileName) {
                    console.log('Found page '+fileName+' ... '+buffer);
                    defered.resolve(buffer);
                    return;
                }
                next();
            });
        });

        walker.on("errors", function(root, nodeStatsArray, next) {
            nodeStatsArray.forEach(function (n) {
                console.error("[ERROR] " + n.name);
                console.error(n.error.message || (n.error.code + ": " + n.error.path));
                defered.resolve(n.name);
                return;
            });
            next();
        });

        walker.on("end", function() {
            console.log('Happy end');
        });

        archaieusCache[fileName] = defered.promise;
    }


    return archaieusCache[fileName];
}


exports.resolve = resolve;