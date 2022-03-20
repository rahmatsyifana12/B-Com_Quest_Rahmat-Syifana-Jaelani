const { Router } = require('express');
const { addContact, deleteContact } = require('./controllers/contact.controller');
const { addUser } = require('./controllers/user.controller');

const router = Router();

router.post('/register', addUser);
router.post('/contacts/add', addContact);

router.delete('/contacts/delete/:contactId', deleteContact);

module.exports = router;