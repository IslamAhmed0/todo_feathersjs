const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const bcrypt = require('bcryptjs');
const { comparePasswords } = require('../../help/comparePasswords.js');
const { generateAccessToken } = require('../../help/comparePasswords.js');

module.exports = (app) => {
    const authentication = new AuthenticationService(app);

    authentication.register('jwt', new JWTStrategy());
    authentication.register('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }));

    authentication.hooks({
        before: {
            create: [
                comparePasswords(),
            ],
            remove: [
                authentication.authenticate('jwt'),
            ],
        },
        after: {
            create: [
                generateAccessToken(),
            ],
        },
    });

    app.use('/authentication', authentication);
};
