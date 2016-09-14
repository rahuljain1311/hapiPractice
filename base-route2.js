var baseRoutes2 = {
    register: function (server, options, next) {
        // add “hello world” route
        server.route({
            method: 'GET',
            path: '/route2',
            handler: function (request, reply) {
                reply('Hello Future Studio2!')
            }
        });
        next(); // this would be synchronous call... after you call next things become async so just use next() cautiously
    }
};

baseRoutes2.register.attributes = {
    name: 'base-routes2',
    version: '1.0.0'
};

module.exports = baseRoutes2;