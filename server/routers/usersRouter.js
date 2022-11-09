const express = require("express");
const {handleSignup, handleLogin} = require("../controllers/usersController");
const usersRouter = express.Router();

usersRouter.post("/signup", handleSignup);
usersRouter.post("/login", handleLogin);

module.exports = {
    usersRouter
};
