const authentication = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');
const authenticationHook = require('./hooks/authentication-hook');

module.exports = function () {
  const app = this;
  const config = app.get('authentication');

  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(jwt());

  app.service('authentication').hooks({
    before: {
      create: [
        authenticationHook()
      ],
      remove: [
        authentication.hooks.authenticate('jwt')
      ]
    }
  });
};
