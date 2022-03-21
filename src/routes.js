const { Router } = require('express');
const { addContact, deleteContact } = require('./controllers/contact.controller');
const { addUser } = require('./controllers/user.controller');

const router = Router();

router.post('/register', addUser);
router.post('/login');

module.exports = router;