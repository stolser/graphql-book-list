const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList
} = require("graphql");

//dummy data
const {
    dummyBooks,
    dummyAuthors
} = require("../dummy-data/books-and-authors");

const books = dummyBooks;
const authors = dummyAuthors;

const {
    isBookOfThisAuthor,
    orderBooksByPubYearAsc
} = require("../utils/books-utils");

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
                console.log(parentBook);
                return authors.find(author => author.id === parentBook.authorId);
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
                return books
                    .filter(isBookOfThisAuthor(parentAuthor))
                    .sort(orderBooksByPubYearAsc());
            }
        }
    })
});

module.exports = {
    BookGraphQlType,
    AuthorGraphQlType
};
