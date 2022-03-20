const express = require('express');
const routes = require('./routes');
const pool = require('./db');
const res = require('express/lib/response');

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
                password VARCHAR(255) NOT NULL
            );`
        );

        await pool.query(
            `CREATE TABLE IF NOT EXISTS contacts (
                id SERIAL NOT NULL PRIMARY KEY,
                name VARHCAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone_number VARCHAR(255) NOT NULL
            );`
        );
    } catch (error) {
        console.log(error);
    }
    console.log(`Server is running at http://localhost:${port}`);
});