const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList
} = require("graphql");

const {BookDbModel} = require("../model/book");
const {AuthorDbModel} = require("../model/author");

// dummy data from local files instead of MongoDB
const {
    dummyBooks,
    dummyAuthors,
    dummyFindAuthorByBookId,
    dummyFindAllBooksByAuthorId
} = require("../dummy-data/books-and-authors");

const BookGraphQlType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        genre: {type: GraphQLString},
        pubYear: {type: GraphQLInt},
        author: {
            type: AuthorGraphQlType,
            resolve(parentBook, args) {
                return AuthorDbModel.findById(parentBook.authorId);
            }
        }
    })
});

const AuthorGraphQlType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        years: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookGraphQlType),
            resolve(parentAuthor, args) {
                return BookDbModel.find({
                    authorId: parentAuthor.id
                });
            }
        }
    })
});

module.exports = {
    BookGraphQlType,
    AuthorGraphQlType
};
