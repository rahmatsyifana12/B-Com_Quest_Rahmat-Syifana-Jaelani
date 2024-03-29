const jwt = require('jsonwebtoken');
const pool = require('../db');

async function addComment(req, res) {
    const { content } = req.body;

    const articleId = req.params.articleId;

    const token = req.headers['authorization'].split(' ')[1];
    const userId = jwt.decode(token).userId;

    try {
        await pool.query(
            'INSERT INTO comments (user_id, article_id, content) VALUES ($1, $2, $3);',
            [userId, articleId, content]
        );

        return res.status(201).json({
            status: 'success',
            message: 'Successfully created comment'
        });
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'Unexpected server error'
        });
    }
}

module.exports = { addComment };