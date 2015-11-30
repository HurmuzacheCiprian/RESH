/**
 * Created by roxana on 29.11.2015.
 */
var fs = require('fs'),
    path = require('path'),
    url = require('url'),
    configuration = require('../configuration.json');

function route(request, response) {
    var pathName = url.parse(request.url).pathname;
    _handle(pathName, request, response);
}

function _handle(pathName, request, response) {
    var pathView;
    if(request.url.indexOf('/bower_components') != -1) {
        pathView = path.join(configuration.bowerComponentsRoot, pathName);
    } else if(request.url.indexOf('/config') != -1) {
        pathView = path.join(configuration.rootApp, pathName);
    } else {
        pathView = path.join(configuration.clientJs, pathName);
    }
    var viewPath = path.join(process.cwd(),pathView);

    fs.readFile(viewPath, 'utf8', function(err,data) {
        if(err) {
            _serveNotFoundPage(viewPath, response);
        } else {
            _servePage(data, response);
        }
    });
}

function _serveNotFoundPage(pagePath, response) {
    if(!response.finished) {
        response.writeHead(404,{'Content-Type':'text/html'});
        console.log('Page path '+pagePath+' not found');
        response.end('Path '+pagePath+' was not found!');
    }
}

function _servePage(data, response) {
    if(!response.finished) {
        response.writeHead(200, {'Content-Type': 'application/javascript'});
        response.end(data);
    }
}

exports.route = route;