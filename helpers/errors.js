'use strict';
module.exports = {
    unauthorized: {
        message: 'Unauthorized',
        code: 'unauthorized',
        status: 403
    },
    invalidId: {
        message: 'Invalid id',
        code: 'invalid_id',
        status: 400
    },
    notFound: {
        message: 'Entity not found',
        code: 'entity_not_found',
        status: 404
    },
    wrongCredentials: {
        message: 'Email or password are wrong',
        code: 'wrong_credentials',
        status: 404
    },
    accessDenied: {
        message: 'Access denied',
        code: 'access_denied',
        status: 403
    },
    invalidData: {
        message: 'Invalid data',
        code: 'invalid_data',
        status: 400
    },
    invalidParams : {
        message: 'Invalid params',
        code: 'invalid_params',
        status: 400
    },
    alreadyExists:{
        message: 'Already exists',
        code: 'already_exists',
        status: 400
    }
}