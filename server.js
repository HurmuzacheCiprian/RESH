/**
 * Created by roxana on 28.11.2015.
 */
(function() {
    var http = require('http'),
        configuration = require('./configuration.json');

    function start() {
        var ipAddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
        var port = process.env.OPENSHIFT_NODEJS_PORT || 8081;
        http.createServer(function(request, response) {
            handleRequest(request, response);
        }).listen(port, ipAddress);
        console.log('Server has started on port '+port+" host "+ipAddress);
    }

    function handleRequest(request, response) {
        var isCss = request.url.indexOf('.css') !== -1;
        var isJs = request.url.indexOf('.js') !== -1;

        if(isCss) {
            //handling['css'].route(request,response);
        } else if(isJs) {
            //handling['js'].route(request, response);
        } else {
            //handling['resources'].route(request, response);
            routehandler['isView'].route(request,response);
        }
    }

    start();

    var routeHandler = {
        'isView': require('./handlers/viewHandler')
    }

})();