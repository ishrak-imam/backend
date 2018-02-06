/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  create (data) {
    return Promise.resolve(data);
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
