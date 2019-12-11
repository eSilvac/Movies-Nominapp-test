const user = require('./user');
const list = require('./list');

function router(app) {
  app.use(user),
  app.use(list)
};

module.exports = router;
