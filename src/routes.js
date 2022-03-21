const { Router } = require('express');
const { addNews, deleteNews } = require('./controllers/news.controller');
const { addUser, loginUser } = require('./controllers/user.controller');
const { authenticate } = require('./middlewares/authenticate.middleware');

const router = Router();

router.post('/register', addUser);
router.post('/login', loginUser);
router.post('/news/add', authenticate, addNews);

router.delete('/news/delete/:newsId', authenticate, deleteNews);

module.exports = router;