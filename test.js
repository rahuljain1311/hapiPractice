const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: '3000',
    labels: ['api']
});

server.app.keyes = '10-0';

server.route({ // binded only on port 3000
    method: 'GET',
    path: '/rj',
    handler: function (request, reply) {
        reply('api index');
    }
});

server.start(function (err) {
    if(err)
        throw err;
    console.log('server is started !!');
    console.log(server.app.keyes);
});