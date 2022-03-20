const pool = require('../db');
const { newContactSchema } = require('../validations/contact.validation');

async function addContact(req, res) {
    const valResult = newContactSchema.validate(req.body);

    if (valResult.error) {
        return res.status(400).json({
            status: 'fail',
            message: 'Object or value is invalid'
        });
    }

    const { name, email, phoneNumber } = req.body;

    try {
        const contact = await pool.query(
            'SELECT * FROM contacts WHERE email = $1 OR phone_number = $2;',
            [email, phoneNumber]
        );

        if (contact.rows.length) {
            return res.status(400).json({
                status: 'fail',
                message: 'Contact with the same email or phone number is already exist'
            });
        }

        await pool.query(
            'INSERT INTO contacts (name, email, phone_number) VALUES ($1, $2, $3);',
            [name, email, phoneNumber]
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

module.exports = { addContact };