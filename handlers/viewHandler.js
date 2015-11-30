/**
 * Created by roxana on 28.11.2015.
 */
(function() {
    var fs = require('fs'),
        path = require('path'),
        url = require('url'),
        configuration = require('../configuration.json');


    function route(request, response) {
        var pathName = url.parse(request.url).pathname;
        _handle(pathName, request, response);
    }

    function _handle(pathName, request, response) {
        var pathView = path.join(configuration.rootApp, pathName);
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
            response.end('Path '+pagePath+' was not found!');
        }
    }

    function _servePage(data, response) {
        if(!response.finished) {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(data);
        }
    }


    exports.route = route;

})();