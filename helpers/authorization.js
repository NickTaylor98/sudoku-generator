async function checkAuth(ability, action, obj) {
    let authorizationResult;
    if (obj && ability && ability.cannot(action, obj)) {
        authorizationResult = {
            access: false,
            error: {
                message: `Unauthorized access`,
                status: 403
            }
        };
    } else
        authorizationResult = {
            access: true
        };
    return authorizationResult;
};

module.exports = {
    checkAuth
};