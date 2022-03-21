const { Router } = require('express');
const { addNews, deleteNews, updateNews } = require('./controllers/news.controller');
const { addUser, loginUser } = require('./controllers/user.controller');
const { authenticate } = require('./middlewares/authenticate.middleware');
const { permission } = require('./middlewares/permission.middleware');
const validate = require('./middlewares/validate.middleware');
const { newNewsSchema, updateNewsSchema } = require('./validations/news.validation');
const { newUserSchema } = require('./validations/user.validation');

const router = Router();

router.post('/register',validate(newUserSchema), addUser);
router.post('/login', loginUser);
router.post('/news/add', authenticate, permission, validate(newNewsSchema), addNews);
// router.post('/news/comments/:newsId', authenticate);

router.put('/news/:newsId', authenticate, permission, validate(updateNewsSchema), updateNews);

router.delete('/news/:newsId', authenticate, permission, deleteNews);

module.exports = router;