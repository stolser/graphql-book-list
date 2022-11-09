const { create, authenticate, find } = require("../services/usersService");
const {parseBody} = require("express-graphql/parseBody");

const handleSignup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        console.log(`name = ${name}; email = ${email}`);
        const user = await find({ email });

        if (user) {
            throw new Error(`Email "${email}" already exists!`);
        }
        // Create a token for the user
        const { token } = await create({ name, email, password });

        // Send a token to the client when a user signs up
        res.json({ token });
    } catch (error) {
        next(error);
    }
};

const handleLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(`Login with email = '${email}'. Request body = ${await parseBody(req)}`)
        const user = await find({ email });

        if (!user) {
            throw new Error("Unable to login.");
        }

        // Create a token for the user, if successfully authenticated
        const { token } = await authenticate({ email, password });
        res.json({ token });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    handleSignup,
    handleLogin,
};
