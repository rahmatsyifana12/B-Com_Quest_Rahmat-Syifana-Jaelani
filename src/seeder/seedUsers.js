const bcrypt = require('bcrypt');
const pool = require('../db');
const { userRole } = require('../validations/user.validation');

function generateHashedPassword(rawPassword) {
    const hashedPassword = bcrypt.hashSync(
        rawPassword,
        parseInt(process.env.SALT_ROUNDS)
    );

    return hashedPassword;
}

async function memberSeeder() {
    await pool.query(
        'INSERT INTO users (email, password, role) VALUES ($1, $2, $3);',
        ['john@gmail.com', generateHashedPassword('John123'), userRole.MEMBER]
    );

    await pool.query(
        'INSERT INTO users (email, password, role) VALUES ($1, $2, $3);',
        ['mary@gmail.com', generateHashedPassword('Mary123'), userRole.MEMBER]
    );
}

async function adminSeeder() {
    await pool.query(
        'INSERT INTO users (email, password, role) VALUES ($1, $2, $3);',
        ['admin1@gmail.com', generateHashedPassword('Admin123'), userRole.ADMIN]
    );

    await pool.query(
        'INSERT INTO users (email, password, role) VALUES ($1, $2, $3);',
        ['admin2@gmail.com', generateHashedPassword('Admin123'), userRole.ADMIN]
    );
}

module.exports = { memberSeeder, adminSeeder };