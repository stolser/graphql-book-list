const path = require('path');
const express = require("express");
const {authorRouter} = require("../routers/authorRouter")
const {usersRouter} = require("../routers/usersRouter")

function setUpStaticContent(app) {
    const publicDirectoryPath = path.join(__dirname, '../public');
    app.use(express.static(publicDirectoryPath));

    app.get("/hello/:name", (req, res) => {
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
