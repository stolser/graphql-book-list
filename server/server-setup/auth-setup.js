require("dotenv").config();
const passport = require("passport");
const {ExtractJwt} = require("passport-jwt");
const JwtStrategy = require('passport-jwt').Strategy;

const {find: findUser} = require("../services/usersService");

const {JWT_SECRET} = process.env;

const strategy = new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET,
    },
    async (jwtPayload, done) => {
        try {
            const user = await findUser({id: jwtPayload.id});

            if (!user) {
                const err = new Error("User not found");
                err.statusCode = 404;
                throw err;
            }

            done(null, user);
        } catch (error) {
            done(error);
        }
    }
);

passport.use(strategy);

const initialize = () => {
    return passport.initialize({});
};

const authenticate = () => {
    return passport.authenticate(
        "jwt",
        {session: false});
};

module.exports = {
    initialize,
    authenticate,
};
