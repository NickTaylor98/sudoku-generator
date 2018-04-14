'use strict';
module.exports = (error, req, res, next) => {;
    if (!error.code) {
        error = {
            message: error.toString(),
            code: 'server_error',
            status: 500
        };
    }
    res.status(error.status).json({
        message: error.message
    });
}