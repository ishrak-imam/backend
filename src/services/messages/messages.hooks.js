const {authenticate} = require('@feathersjs/authentication').hooks;
const processMessageData = require('../../hooks/process-message-data');
const {fastJoin} = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [processMessageData()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [fastJoin({
      joins: {
        users: () => async (message, context) => {
          const user = await context.app.service('users').get(message.from, context.params);
          message.from = user;
        }
      }
    })],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
