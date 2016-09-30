/**
 * Created by rahuljain on 9/18/16.
 */
const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 3000
});

// Add the route
server.route({
    method: ['GET', 'PUT', 'POST'],
    path:'/hi/{user}/{name?}',
    handler: function (request, reply) {
        var x = request.params.user ? encodeURIComponent(request.params.user) : 'Stranger';
        var y = request.params.name ? encodeURIComponent(request.params.name) : 'Last';
        return reply('hello ' + x + '!' + y);
    },
    config: {// dont affect the functionality. used for making documentation using plugin lout
        // handler: handlers.getToDo,
        description: 'Say hello!',
        notes: 'The user parameter defaults to \'stranger\' if unspecified',
        tags: ['api', 'greeting']
        // validate: {
        //     params: {
        //         id : Joi.number()
        //             .required()
        //             .description('the id for the todo item'),
        //     }
        // }
    }
});

// // Start the server... can not preStart with Good module...
// server.start(function (err) {
//     if (err) {
//         throw err;
//     }
//     console.log("Server running at:", server.info.uri);
// });

const options = {
    info: {
        'title': 'Test API Documentation',
        'version': Pack.version,
    },
    documentationPage: false
};

// to test it go to http://localhost:3000/documentation
server.register([
    Inert,
    Vision,
    {
        'register': HapiSwagger,
        'options': options
    }], (err) => {
    server.start( (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Server running at:', server.info.uri);
        }
    });
});

// server.route(Routes);