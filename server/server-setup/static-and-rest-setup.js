const path = require('path');
const express = require("express");
const {authorRouter} = require("../routers/authorRouter")
const {usersRouter} = require("../routers/usersRouter")

const publicDirectoryPath = path.join(__dirname, './public');

function setUpStaticContent(app) {
    app.use(express.static(publicDirectoryPath));

    app.get("/:name", (req, res) => {
        res.send(`Hello ${req.params.name}!`)
    });
}

function setUpRestRouting(app) {
    let baseRestPath = process.env.REST_BASE_PATH;
    let authorPath = `${baseRestPath}/author`;
    let usersPath = `${baseRestPath}/users`;

    app.use(authorPath, authorRouter);
    app.use(usersPath, usersRouter);
}

module.exports = {
    setUpStaticContent,
    setUpRestRouting
};
