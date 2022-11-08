const express = require("express");
const cors = require('cors');
const {initialize} = require("./auth-setup");

function setUpGeneral(app) {
    app.use(initialize());

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    app.use(cors());

    app.use((req, res, next) => {
        const {method, path} = req;
        console.log(
            `New request to: ${method} ${path} at ${new Date().toISOString()}`
        );
        next();
    });
}

module.exports = {
    setUpGeneral
};
