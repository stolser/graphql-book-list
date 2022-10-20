const {mongoose} = require("mongoose");

const authorSchema = new mongoose.Schema({
    name: String,
    years: String,
    age: Number
});

const AuthorDbModel = mongoose.model("Author", authorSchema);

module.exports = {
    AuthorDbModel
};
