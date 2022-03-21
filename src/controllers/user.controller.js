const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const { userRole } = require('../validations/user.validation');

async function addUser(req, res) {
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


async function loginUser(req, res) {
    const { email, password } = req.body;
    let user;

    try {
        user = await pool.query(
            'SELECT * FROM users WHERE email=$1;', [email]
        );

        if (!user.rows.length) {
            return res.status(400).json({
                status: 'fail',
                message: 'Account doesn\'t exist'
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'Unexpected server error'
        });
    }

    try {
        if (!bcrypt.compareSync(password, user.rows[0].password)) {
            return res.status(400).json({
                status: 'fail',
                message: 'Object or value is invalid'
            });
        }

        const payload = {
            userId: user.rows[0].id,
            email: user.rows[0].email,
            role: user.rows[0].role
        };

        const accessToken = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_SECRET
        );

        return res.status(200).json({
            status: 'success',
            message: 'Successfully login',
            data: {
                accessToken
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Unexpected server error'
        });
    }
}

module.exports = { addUser, loginUser };