// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const errors = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async hook => {
    const user = await hook.app.service('users').find({
      query: {
        email: hook.data.email
      }
    });
    if (user.data.length > 0) {
      throw new errors.Conflict(`Email ${hook.data.email} already exists`);
    }
    return hook;
  };
};
