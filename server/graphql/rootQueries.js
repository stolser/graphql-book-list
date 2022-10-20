const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLList
} = require("graphql");

const {
    BookGraphQlType,
    AuthorGraphQlType
} = require("./types");

//dummy data
const {
    dummyBooks,
    dummyAuthors
} = require("../dummy-data/books-and-authors");

const books = dummyBooks;
const authors = dummyAuthors;

const GraphQLRootQueries = new GraphQLObjectType({
    name: "GraphQLRootQueries",
    fields: {
        book: {
            type: BookGraphQlType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                // get data from the source
                return books.find(book => book.id === args.id);
            }
        },

        author: {
            type: AuthorGraphQlType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                // get data from the source
                return authors.find(author => author.id === args.id);
            }
        },

        books: {
            type: new GraphQLList(BookGraphQlType),
            resolve(parent, args) {
                return books;
            }
        },

        authors: {
            type: new GraphQLList(AuthorGraphQlType),
            resolve(parent, args) {
                return authors;
            }
        }
    }
});

module.exports = {
    GraphQLRootQueries
};
