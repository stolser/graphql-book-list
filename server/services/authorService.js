const {AuthorDbModel} = require("../model/author");

function createAuthor(request) {
    let reqBody = request.body;
    console.log(`reqBody fields = ${Object.getOwnPropertyNames(reqBody)}`);

    let authorToSave = new AuthorDbModel({
        name: reqBody.name,
        years: reqBody.years,
        age: reqBody.age
    });

    return authorToSave.save();
}

module.exports = {
    createAuthor
};
