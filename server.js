// 'use strict';

const Hapi = require('hapi');
const Good = require('good');
const Path = require('path');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 3000,
    routes: {
        files:{
            relativeTo: Path.join(__dirname, 'public')
        }
    }
});

// // Start the server... can not preStart with Good module...
// server.start(function (err) {
//     if (err) {
//         throw err;
//     }
//     console.log("Server running at:", server.info.uri);
// });

// Add the route
server.route({
    method: ['GET', 'PUT', 'POST'],
    path:'/hi/{user}/{name}',
    handler: function (request, reply) {
        var x = request.params.user ? encodeURIComponent(request.params.user) : 'Stranger';
        var y = request.params.name ? encodeURIComponent(request.params.name) : 'Last';
        return reply('hello ' + x + '!' + y);
    },
    config: {// dont affect the functionality. used for making documentation using plugin lout
        description: 'Say hello!',
        notes: 'The user parameter defaults to \'stranger\' if unspecified',
        tags: ['api', 'greeting']
    }
});

server.register(require('inert'), function(err){ // inert do live reloading so we can change the file here and reload the page on browser... no need to restart server
    if (err) {
        throw err; // this call back is required when registering plugins..
    }
    server.route({ // this route requires inert so it is placed within the call back of the package
        method: 'GET',
        path: '/css/{files*}',
        // handler: function (request, reply) { // this also works fine
        //     reply.file('./public/hello.html');
        // }

        // handler: { // this works because of relativeTo field in server.connection
        //     file: 'hello.html'
        // }
        // handler: { // this works fantastic.
        //     file: {
        //         path: 'Archive.zip',
        //         filename: 'client.zip', // override the filename in the Content-Disposition header
        //         mode: 'attachment', // specify the Content-Disposition is an attachment
        //         lookupCompressed: true // allow looking for script.js.gz if the request allows it
        //     }
        // }
        handler:{
            directory: {
                path: './dir'  // It doesnt need to write public here coz in server.connection we have specified default directory as public
                // listing: true
            }
        }
    });
    // // Start the server... can not preStart with Good module...
    // server.start(function (err) {
    //     if (err) {
    //         throw err;
    //     }
    //     console.log("Server running at:", server.info.uri);
    // });
});

server.register({
    register: Good,
    options: {
        reporters: {
            console: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                    response: '*',
                    log: '*'
                }]
            }, {
                module: 'good-console'
            }, 'stdout']
        }
    }
}, function(err){
        if (err) {
            throw err; // something bad happened loading the plugin
        }
        server.start(function(err) {
        if (err) {
            throw err;
        }
        server.log('info', 'Server running at: ' + server.info.uri);
        });
    }
);