const express = require("express");
const authorController = require("../controllers/authorController");

const authorRouter = express.Router();

// /author
authorRouter.post("/", authorController.createAuthor);

module.exports = {
    authorRouter
};
