const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const { newUserSchema, userRole } = require('../validations/user.validation');

async function addUser(req, res) {
    const valResult = newUserSchema.validate({
        ...req.body,
        role: userRole.MEMBER
    });

    if (valResult.error) {
        return res.status(400).json({
            status: 'fail',
            message: 'Object or value is invalid'
        });
    }

    const { email, password } = req.body;

    try {
        const users = await pool.query('SELECT * FROM users WHERE email = $1;', [email]);

        if (users.rows.length) {
            return res.status(400).json({
                status: 'fail',
                message: 'This account is already exist'
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'Unexpected server error'
        });
    }

    const hashedPassword = bcrypt.hashSync(
        password,
        parseInt(process.env.SALT_ROUNDS)
    );

    try {
        await pool.query(
            'INSERT INTO users (email, password, role) VALUES ($1, $2, $3);',
            [email, hashedPassword, userRole.MEMBER]
        );

        return res.status(201).json({
            status: 'success',
            message: 'Successfully registered a new account'
        });
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'Unexpected server error'
        });
    }
}


module.exports = { addUser };