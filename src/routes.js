const { Router } = require('express');
const { addNews, deleteNews, updateNews } = require('./controllers/news.controller');
const { addUser, loginUser } = require('./controllers/user.controller');
const { authenticate } = require('./middlewares/authenticate.middleware');
const { permission } = require('./middlewares/permission.middleware');

const router = Router();

router.post('/register', addUser);
router.post('/login', loginUser);
router.post('/news/add', authenticate, permission, addNews);
router.post('/news/comment/:newsId', authenticate);

router.put('/news/update/:newsId', authenticate, permission, updateNews);

router.delete('/news/delete/:newsId', authenticate, permission, deleteNews);

module.exports = router;