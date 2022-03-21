const express = require('express');
const routes = require('./routes');
const pool = require('./db');
const { memberSeeder, adminSeeder } = require('./seeder/seedUsers');

require('dotenv').config();

const app = express();
const port = 5000;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(port, async () => {
    try {
        await pool.query(
            `CREATE TABLE IF NOT EXISTS users (
                id SERIAL NOT NULL PRIMARY KEY,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                role INT NOT NULL
            );`
        );

        await pool.query(
            `CREATE TABLE IF NOT EXISTS news (
                id SERIAL NOT NULL PRIMARY KEY,
                user_id INT NOT NULL,
                title VARCHAR(255) NOT NULL,
                content VARCHAR(255) NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id)
            );`
        );

        await pool.query(
            `CREATE TABLE IF NOT EXISTS comments (
                id SERIAL NOT NULL PRIMARY KEY,
                user_id INT NOT NULL,
                news_id INT NOT NULL,
                content VARCHAR(255) NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (news_id) REFERENCES news(id) ON DELETE CASCADE
            );`
        );

        // memberSeeder();
        // adminSeeder();
    } catch (error) {
        console.log(error);
    }
    console.log(`Server is running at http://localhost:${port}`);
});