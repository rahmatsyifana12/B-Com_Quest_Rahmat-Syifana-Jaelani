const pool = require('../db');

async function articleSeeder() {
    await pool.query(
        'INSERT INTO articles (user_id, title, content) VALUES ($1, $2, $3);',
        [3, 'Wonderful Indonesia', 'Indonesia has a lot of beautiful islands.']
    );

    await pool.query(
        'INSERT INTO articles (user_id, title, content) VALUES ($1, $2, $3);',
        [4, 'The most exotic animal in Indonesia',
            'Indonesia has a lot of exotic creature that\'s spread around the world'
        ]
    );
}

module.exports = articleSeeder;