const Hapi = require('hapi');
const _ = require('lodash');

const  server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: '3000',
    labels: ['api']
});

server.connection({
    host: 'localhost',
    port: '3001',
    labels: ['asdf']
});

const api = server.select('api');
const asdf = server.select('asdf');

// all servers with a label of backend OR api
const myServers = server.select(['asdf', 'api']);

// servers with a label of api AND admin
const adminServers = server.select('api').select('admin');

myServers.route({ // binded only on port 3000
    method: 'GET',
    path: '/rj',
    handler: function (request, reply) {
        reply('api index');
    }
});

// // here we register plugins but we dont select the labels in advance... just another way!!
// server.register({
//     register: require('./base-route')
// }, {
//     select: ['api', 'asdf']
// }, function (err) {
//     // handle error
//     // do further stuff like view configuration, etc.
//     }
// );

//this works just testing above one
server.register( // this base-route is binded on all ports of the server.
    [require('./base-route'),require('./base-route2')] ,{
        routes: {
            prefix: '/plugins'    // http://localhost:3000/plugins/route2
        }
    }, function(err){
        if (err)
            throw err;
    });

api.route({
    method: 'GET',
    path: '/pj',
    handler: function (request, reply) {
        reply('api index1');
    }
});

server.start(function (err) {
    if(err)
        throw  err;
    _.forEach(server.connections, function(connection) {
        console.log('Server started at: ' + connection.info.uri);
    });
});