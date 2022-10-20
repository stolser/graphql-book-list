const {mongoose} = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: String,
    genre: String,
    pubYear: Number,
    authorId: String
});

const BookDbModel = mongoose.model("Book", bookSchema);

module.exports = {
    BookDbModel
};
