
module.exports = function (app) {
  app.on('connection', connection => {
    app.channel('anonymous').join(connection);
  });

  app.on('login', (payload, { connection }) => {
    if (connection) {
      app.channel('anonymous').leave(connection);
      app.channel('authenticated').join(connection);
    }
  });

  // A global publisher that sends all events to all authenticated clients
  app.publish((data, context) => {
    return app.channel('authenticated');
  });
};
