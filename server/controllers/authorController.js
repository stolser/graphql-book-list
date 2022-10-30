const authorService = require("../services/authorService");

const createAuthor = async (req, res, next) => {
    try {
        res
            .status(201)
            .json({ data: await authorService.createAuthor(req) });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createAuthor
};
