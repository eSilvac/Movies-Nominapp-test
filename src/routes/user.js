const user = require('../controllers/user');
const router = require('express').Router();

router.post('/register', user.register);
router.post('/login', user.login);

module.exports = router;
