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
        _handle(pathName, response);
    }

    function _handle(pathName, response) {
        var path = path.join(configuration.rootApp, pathName);
        var viewPath = path.join(process.cwd(),path);

        consolew.log(viewPath);
    }


    exports.route = route;

})();