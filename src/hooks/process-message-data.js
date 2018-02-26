// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const errors = require('@feathersjs/errors');

const isValid = (data) => {
  const {from, to, text} = data;
  const obj = {err: true};
  if (!from) {
    return {...obj, msg: 'From not specified'};
  }
  if (!to) {
    return {...obj, msg: 'To not specified'};
  }
  if (!text) {
    return {...obj, msg: 'Text not specified'};
  }
  return {error: false, msg: 'OK'};
};

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const {data} = context;
    const check = isValid(data);
    if (check.err) {
      return Promise.reject(new errors.BadRequest(check.msg));
    }
    return context;
  };
};
