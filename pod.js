// 'use strict';
const Podium = require('podium');
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
const myServers = server.select(['asdf', 'api']);


myServers.route({ // binded only on port 3000
    method: 'GET',
    path: '/rj',
    handler: function (request, reply) {
        reply('api index');
    }
});

server.start(function (err) {
    if(err)
        throw  err;
    _.forEach(server.connections, function(connection) {
        console.log('Server started at: ' + connection.info.uri);
    });
});

// ######################

const ser = new Podium();

ser.registerEvent({
    name: 'st',
    channels: ['asdf','api']
});
//
//
// ser.emit({
//     // criteria: {
//         name: 'st',
//         channel: 'asdf',
//         tags: ['tag1', 'tag2'],
//     // },
//     data: 'valueTosubs', function (err) { // this was not working ans was optional
//         if (err)
//             throw err;
//         console.log('success');
//     }
// });
//
// ser.on({
//     name: 'st',
//     block: true,
//     channels: ['asdf','api'],
//     listener: function(){
//        console.log('hu la la');
//     }
// });

// ser.registerEvent('st');
ser.on('st',function(update){
    console.log(update);
});
// ser.emit('st','hello');



