/**
 * Created by roxana on 29.11.2015.
 */

var httpHelper = require('../util/httpHelper');

function route(request, response) {
    if (request.method == 'GET') {
        _doGet(request, response);
    } else if (request.method == 'POST') {
        _doPost(request, response);
    }
}

function _doGet(request, response) {
    var port = request.headers.port == 'null' ? null : request.headers.port;
    httpHelper.get(request.headers.hostname, port, request.headers.path)
        .then(function (data) {
            _successResponse(data.data, response);
        }, function (error) {
            _errorResponse(error, response);
        });
}

function _doPost(request, response) {
    var port = request.headers.port == 'null' ? null : request.headers.port;
    var headers = {
        'Content-Type': 'application/json'
    };
    var body = "";
    request.on('data', function (chunk) {
        body += chunk.toString();
    });

    request.on("end", function () {
        httpHelper.post(request.headers.hostname, port, request.headers.path, headers, JSON.parse(body))
            .then(function (data) {
                _successResponse(data.data, response);
            }, function (error) {
                _errorResponse(error, response);
            });
    });
}

function _successResponse(data, response) {
    if (!response.finished) {
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(data));
    }
}

function _errorResponse(error, response) {
    if (!response.finished) {
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(error));
    }
}


exports.route = route;