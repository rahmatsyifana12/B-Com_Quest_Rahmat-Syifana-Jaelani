const pool = require('../db');
const jwt = require('jsonwebtoken');

async function addArticle(req, res) {
    const { title, content } = req.body;

    const token = req.headers['authorization'].split(' ')[1];
    const userId = jwt.decode(token).userId;

    try {
        await pool.query(
            'INSERT INTO articles (user_id, title, content) VALUES ($1, $2, $3);',
            [userId, title, content]
        );

        return res.status(201).json({
            status: 'success',
            message: 'Successfully created a new article'
        });
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'Unexpected server error'
        });
    }
}

async function updateArticle(req, res) {
    const articleId = req.params.newsId;

    try {
        const article = await pool.query('SELECT * FROM news WHERE id = $1;', [articleId]);

        if (!article.rows.length) {
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
            'UPDATE articles SET title = $1, content = $2 WHERE id = $3;',
            [title, content, articleId]
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

async function deleteArticle(req, res) {
    const articleId = req.params.newsId;

    try {
        const article = await pool.query('SELECT * FROM articles WHERE id = $1;', [articleId]);

        if (!article.rows.length) {
            return res.status(404).json({
                status: 'fail',
                message: 'Article not found'
            });
        }

        await pool.query(
            'DELETE FROM articles WHERE id = $1;',
            [articleId]
        );

        return res.status(200).json({
            status: 'success',
            message: 'Successfully deleted article'
        });
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'Unexpected server error'
        });
    }
}

async function getAllArticles(req, res) {
    try {
        const articles = await pool.query('SELECT * FROM articles;');

        return res.status(200).json({
            status: 'success',
            message: 'Found all articles',
            data: {
                articles: articles.rows
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'Unexpected server error'
        });
    }
}

async function getArticle(req, res) {
    const articleId = req.params.articleId;
    try {
        const article = await pool.query('SELECT * FROM articles WHERE id = $1;', [articleId]);

        if (!article.rows.length) {
            return res.status(404).json({
                status: 'fail',
                message: 'Article not found'
            });
        }

        const comments = await pool.query('SELECT * FROM comments WHERE article_id = $1;', [articleId]);

        return res.status(200).json({
            status: 'success',
            message: 'Article found',
            data: {
                article: article.rows[0],
                comments: comments.rows
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'Unexpected server error'
        });
    }
}

module.exports = {
    addArticle, deleteArticle, updateArticle, getAllArticles, getArticle
};