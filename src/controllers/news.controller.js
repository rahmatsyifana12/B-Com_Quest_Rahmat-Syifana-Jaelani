const pool = require('../db');
const jwt = require('jsonwebtoken');
const { newNewsSchema } = require('../validations/news.validation');

async function addNews(req, res) {
    const valResult = newNewsSchema.validate(req.body);

    if (valResult.error) {
        return res.status(400).json({
            status: 'fail',
            message: 'Object or value is invalid'
        });
    }

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
            message: 'Successfully created a new contact'
        });
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'Unexpected server error'
        });
    }
}

async function deleteNews(req, res) {
    const contactId = req.params.contactId;
    try {
        const contact = await pool.query('SELECT * FROM contacts WHERE id = $1;', [contactId]);

        if (!contact.rows.length) {
            return res.status(404).json({
                status: 'fail',
                message: 'Account not found'
            });
        }

        await pool.query(
            'DELETE FROM contacts WHERE id = $1;',
            [contactId]
        );

        return res.status(200).json({
            status: 'success',
            message: 'Successfully deleted contact'
        });
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'Unexpected server error'
        });
    }
}

module.exports = { addNews, deleteNews };