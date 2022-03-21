const { Router } = require('express');
const { addNews } = require('./controllers/news.controller');
const { addUser } = require('./controllers/user.controller');

const router = Router();

router.post('/register', addUser);
router.post('/login');

module.exports = router;