const { Router } = require('express');
const { addContact } = require('./controllers/contact.controller');
const { addUser } = require('./controllers/user.controller');

const router = Router();

router.post('/register', addUser);
router.post('/contacts/add', addContact);

module.exports = router;