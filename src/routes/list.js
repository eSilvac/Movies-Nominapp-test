const list = require('../controllers/list');
const router = require('express').Router();

router.get('/lists', list.index);
router.get('/list/:listId', list.show);
router.post('/list', list.create);
router.patch('/list/:listId', list.edit);
router.delete('/list/:listId', list.delete);

module.exports = router;
