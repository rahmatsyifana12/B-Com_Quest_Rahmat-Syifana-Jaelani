const jwt = require('jsonwebtoken');
const { userRole } = require('../validations/user.validation');

function permission(req, res, next) {
    const token = req.headers['authorization'].split(' ')[1];
    const role = jwt.decode(token).role;

    if (role === userRole.ADMIN) {
        next();
    } else {
        return res.status(401).json({
            status: 'fail',
            message: 'Unauthorized error'
        });
    }
}

module.exports = { permission };