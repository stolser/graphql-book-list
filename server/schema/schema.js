const {
    dummyBooks,
    dummyAuthors
} = require("../dummy-data/books-and-authors")

const {
    isBookOfThisAuthor,
    orderBooksByPubYearAsc
} = require("../utils/books-utils");

const graphql = require("graphql");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLID,
    GraphQLList
} = graphql;

//dummy data
const books = dummyBooks;
const authors = dummyAuthors;

// GraphQL types

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        genre: {type: GraphQLString},
        pubYear: {type: GraphQLInt},
        author: {
            type: AuthorType,
            resolve(parentBook, args) {
                console.log(parentBook);
                return authors.find(author => author.id === parentBook.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        years: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parentAuthor, args) {
                return books
                    .filter(isBookOfThisAuthor(parentAuthor))
                    .sort(orderBooksByPubYearAsc());
            }
        }
    })
});

// root queries

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                // get data from the source
                return books.find(book => book.id === args.id);
            }
        },

        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                // get data from the source
                return authors.find(author => author.id === args.id);
            }
        },

        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books;
            }
        },

        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})
