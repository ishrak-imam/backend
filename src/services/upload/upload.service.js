// Initializes the `upload` service on path `/upload`
const createService = require('./upload.class.js');
const hooks = require('./upload.hooks');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'upload',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/upload', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('upload');

  service.hooks(hooks);
};
