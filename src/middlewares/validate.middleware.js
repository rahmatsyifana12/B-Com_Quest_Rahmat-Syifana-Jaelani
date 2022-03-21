function validate(schema) {
    return (req, res, next) => {
        const valResult = schema.validate(req.body);

        if (valResult.error) {
            return res.status(400).json({
                status: 'fail',
                message: valResult.error.message
            });
        }

        return next();
    };
}

module.exports = validate;