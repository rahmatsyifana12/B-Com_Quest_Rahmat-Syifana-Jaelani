const bcrypt = require('bcrypt');
const pool = require('../db');

const { newUserSchema } = require('../validations/user.validation');

async function addUser(req, res) {
    const valResult = newUserSchema.validate(req.body);

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
            'INSERT INTO users (email, password) VALUES ($1, $2);',
            [email, hashedPassword]
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