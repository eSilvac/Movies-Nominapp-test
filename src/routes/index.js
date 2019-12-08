const user = require('./user');

function router(app) {
  app.use(user)
};

module.exports = router;
