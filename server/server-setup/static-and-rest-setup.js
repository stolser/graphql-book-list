const path = require('path');
const express = require("express");
const {authorRouter} = require("../routers/authorRouter")

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

    app.use(authorPath, authorRouter);
}

module.exports = {
    setUpStaticContent,
    setUpRestRouting
};
