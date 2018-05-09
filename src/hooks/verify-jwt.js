// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const jwt = require('jsonwebtoken');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const config = context.app.get('authentication');
    const token = context.params.headers.authorization;
    console.log(jwt.verify(token, config.secret));
    return context;
  };
};
