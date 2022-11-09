const express = require("express");
const authorController = require("../controllers/authorController");
const {authenticate} = require("../server-setup/auth-setup");

const authorRouter = express.Router();

// /author
authorRouter
    .route("/")
    .post(authenticate(), authorController.createAuthor);

module.exports = {
    authorRouter
};
