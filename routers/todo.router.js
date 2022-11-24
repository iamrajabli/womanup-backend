const express = require('express');
const {
    create,
    tasks,
    remove,
    update,
    expire
} = require('../controllers/todo.controller');

const router = express.Router();

const auth = require('../middlewares/auth.middleware');

router.post('/create', auth, create);
router.put('/update/:id', auth, update);
router.put('/expire/:id', auth, expire);
router.delete('/remove/:id', auth, remove);
router.get('/tasks', auth, tasks);

module.exports = router;