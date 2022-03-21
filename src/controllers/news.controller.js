const pool = require('../db');
const jwt = require('jsonwebtoken');

async function addNews(req, res) {
    const { title, content } = req.body;

    const token = req.headers['authorization'].split(' ')[1];
    const userId = jwt.decode(token).userId;

    try {
        await pool.query(
            'INSERT INTO news (user_id, title, content) VALUES ($1, $2, $3);',
            [userId, title, content]
        );

        return res.status(201).json({
            status: 'success',
            message: 'Successfully created a new news'
        });
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'Unexpected server error'
        });
    }
}

async function updateNews(req, res) {
    const newsId = req.params.newsId;

    try {
        const news = await pool.query('SELECT * FROM news WHERE id = $1;', [newsId]);

        if (!news.rows.length) {
            return res.status(404).json({
                status: 'fail',
                message: 'News not found'
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'Unexpected server error'
        });
    }

    const { title, content } = req.body;

    try {
        await pool.query(
            'UPDATE news SET title = $1, content = $2 WHERE id = $3;',
            [title, content, newsId]
        );

        return res.status(200).json({
            status: 'success',
            message: 'Successfully updated news'
        });
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'Unexpected server error'
        });
    }
}

async function deleteNews(req, res) {
    const newsId = req.params.newsId;

    try {
        const news = await pool.query('SELECT * FROM news WHERE id = $1;', [newsId]);

        if (!news.rows.length) {
            return res.status(404).json({
                status: 'fail',
                message: 'News not found'
            });
        }

        await pool.query(
            'DELETE FROM news WHERE id = $1;',
            [newsId]
        );

        return res.status(200).json({
            status: 'success',
            message: 'Successfully deleted news'
        });
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'Unexpected server error'
        });
    }
}

module.exports = { addNews, deleteNews, updateNews };