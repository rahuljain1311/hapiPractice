const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({
    routes: {
        response: {
            emptyStatusCode: 204
        }
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        reply().code(400);
    }
});

server.inject('/', function(res){
    console.log(res.statusCode);
});