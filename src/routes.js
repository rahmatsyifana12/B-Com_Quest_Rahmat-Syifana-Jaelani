const { Router } = require('express');
const { addComment } = require('./controllers/comment.controller');
const { addArticle, deleteArticle, updateArticle } = require('./controllers/articles.controller');
const { addUser, loginUser } = require('./controllers/user.controller');
const { authenticate } = require('./middlewares/authenticate.middleware');
const { permission } = require('./middlewares/permission.middleware');
const validate = require('./middlewares/validate.middleware');
const { newCommentSchema } = require('./validations/comment.validation');
const { newArticleSchema, updateArticleSchema } = require('./validations/news.validation');
const { newUserSchema } = require('./validations/user.validation');

const router = Router();

router.post('/register',validate(newUserSchema), addUser);
router.post('/login', loginUser);
router.post('/articles/add', authenticate, permission, validate(newArticleSchema), addArticle);
router.post('/articles/comments/:articleId', authenticate, validate(newCommentSchema), addComment);

router.put('/articles/:articleId', authenticate, permission, validate(updateArticleSchema), updateArticle);

router.delete('/articles/:articleId', authenticate, permission, deleteArticle);

module.exports = router;