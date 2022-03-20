const { Router } = require('express');
const { addUser } = require('./controllers/user.controller');

const router = Router();

router.post('/register', addUser);

module.exports = router;