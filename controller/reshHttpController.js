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
    console.log('Get method called');
    httpHelper.get('api.flickr.com',null,'/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json')
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