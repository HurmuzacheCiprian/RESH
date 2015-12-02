/**
 * Created by roxana on 29.11.2015.
 */
'use strict';

var http = require('http'),
    Promise = require('promised-io/promise'),
    defer = Promise.defer;

function get(hostname, port, path, headers) {
    return _request('GET', hostname, port, path, headers);
}

function post(hostname, port, path, headers, body) {
    return _request('POST', hostname, port, path, headers, body);
}

function _request(method, hostname, port, path, headers, body) {
    var requestDescription;
    if(port == null) {
        requestDescription = method + ' ' + hostname + path;
    } else {
        console.log(port);
        requestDescription = method + ' ' + hostname + ':' + port + path;
    }
    console.log('Making request '+requestDescription);
    var deferred = defer();

    var options = {
        hostname: hostname,
        path: path,
        port: port,
        method: method,
        headers: headers
    };

    //local hack don't understand the meaning of this
    var isResolved = false;
    var request = http.request(options, function (res) {
        var chunk = '';

        res.on('data', function (buff) {
            chunk += buff.toString('utf8');
        });

        res.on('end', function (buff) {
            if (buff) {
                chunk += buff.toString('utf8');
            }


            if (res.statusCode < 400) {
                try {
                    var data;
                    try {
                        data = (chunk === '') ? {} : JSON.parse(chunk);
                    } catch( ex) {
                        data = chunk;
                    }
                } catch (ex) {
                    console.log("ERROR ", chunk);
                    deferred.reject(new Error('Failed to perform request',
                        'MAJOR', res.statusCode));
                    isResolved = true;
                }

                if(!isResolved) {
                    isResolved = true;
                    deferred.resolve({
                        statusCode: res.statusCode,
                        data: data
                    });
                }
            } else {
                if(!isResolved) {
                    isResolved = true;
                    console.log("ERROR ", chunk);
                    deferred.reject(new Error('Failed to perform request',
                        'MAJOR', res.statusCode));
                }
            }
        });
    });

    request.on('error', function (err) {
        if(!isResolved) {
            isResolved = true;
            console.log(err);
            deferred.reject(new Error('Failed to perform request'));
        }
    });

    if (body) {
        request.write(JSON.stringify(body));
    }

    request.end();

    return deferred.promise;
}

module.exports = {
    get: get,
    post: post
};