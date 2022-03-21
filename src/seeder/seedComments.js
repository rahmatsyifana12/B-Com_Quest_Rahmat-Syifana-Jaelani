const pool = require('../db');

async function commentSeeder() {
    await pool.query(
        'INSERT INTO comments (user_id, article_id, content) VALUES ($1, $2, $3);',
        [1, 1, 'This article is very good.']
    );

    await pool.query(
        'INSERT INTO comments (user_id, article_id, content) VALUES ($1, $2, $3);',
        [2, 2, 'That is very beautiful.']
    );
}

module.exports = commentSeeder;