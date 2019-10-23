const authJWT = require('passport-jwt');

const jwtOptions = {
    secretOrKey: 'SECRET_KEY',
    jwtFromRequest: authJWT.ExtractJwt.fromAuthHeaderAsBearerToken()
}

let jwtStrategy = new authJWT.Strategy({
    ...jwtOptions
}, (jwtPayload, next) => {
    next(null, {
        id: jwtPayload.id
    });
});
module.exports = jwtStrategy;