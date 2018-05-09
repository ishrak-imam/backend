const authentication = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');
// const local = require('@feathersjs/authentication-local');
// const oauth2 = require('@feathersjs/authentication-oauth2');
// const FacebookStrategy = require('passport-facebook');

const authenticationHook = require('./hooks/authentication-hook');

module.exports = function () {
  const app = this;
  const config = app.get('authentication');

  // // // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(jwt());
  // // app.configure(local());

  // // app.configure(oauth2(Object.assign({
  // //   name: 'facebook',
  // //   Strategy: FacebookStrategy
  // // }, config.facebook)));

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('authentication').hooks({
    before: {
      create: [
        authenticationHook()
        // authentication.hooks.authenticate(config.strategies)
      ],
      remove: [
        authentication.hooks.authenticate('jwt')
      ]
    }
  });
};
