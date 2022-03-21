const jwt = require('jsonwebtoken');
const pool = require('../db');

async function addComment(req, res) {
    const { content } = req.body;

    const newsId = req.params.newsId;

    const token = req.headers['authorization'].split(' ')[1];
    const userId = jwt.decode(token).userId;

    try {
        await pool.query(
            'INSERT INTO comments (user_id, news_id, content) VALUES ($1, $2, $3);',
            [userId, newsId, content]
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