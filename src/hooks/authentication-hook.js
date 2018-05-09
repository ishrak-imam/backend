// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const errors = require('@feathersjs/errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const {email, password, strategy} = context.data;
    const user = await context.app.service('users').find({query: {email}});
    if (user.data.length === 0) {
      throw new errors.BadRequest('User doesn\'t exist');
    }
    const {firstName, lastName} = user.data[0];
    const config = context.app.get('authentication');
    if (strategy === 'local') { // password will only be checked in local strategy
      if (!bcrypt.compareSync(password, user.data[0].password)) {
        throw new errors.BadRequest('Wrong password');
      }
    }
    context.result = {accessToken: jwt.sign({firstName, lastName, email, ...config.jwt}, config.secret)};
    return context;
  };
};
