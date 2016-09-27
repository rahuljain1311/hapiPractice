var baseRoutes = {
    register: function (server, options, next) {
        // add “hello world” route
        server.route({
            method: 'GET',
            path: '/route1',
            handler: function (request, reply) {
                reply('Hello Future Studio!')
            }
        });
        next(); // this would be synchronous call... after you call next things become async so just use next() cautiously
    }
};

baseRoutes.register.attributes = {
    name: 'base-routesdafdsafasdf',
    // version: '1.0.0'
};

module.exports = baseRoutes;