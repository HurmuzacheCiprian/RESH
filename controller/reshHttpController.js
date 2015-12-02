/**
 * Created by roxana on 29.11.2015.
 */

var httpHelper = require('../util/httpHelper');

function route(request, response) {
    if(request.method == 'GET') {
        _doGet(request, response);
    }
}

function _doGet(request, response) {
    var port = request.headers.port == 'null' ? null : request.headers.port;
    httpHelper.get(request.headers.hostname,port,request.headers.path)
        .then(function(data) {
            _successResponse(data.data,response);
        }, function(error) {
            _errorResponse(error, response);
        });
}

function _successResponse(data, response) {
    if(!response.finished) {
        response.writeHead(200,{'Content-Type':'application/json'});
        response.end(JSON.stringify(data));
    }
}

function _errorResponse(error, response) {
    if(!response.finished) {
        response.writeHead(500,{'Content-Type':'application/json'});
        response.end(Json.stringify({'error':'error'}));
    }
}


exports.route = route;