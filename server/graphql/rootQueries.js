const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLList
} = require("graphql");

const {
    BookGraphQlType,
    AuthorGraphQlType
} = require("./types");

const {BookDbModel} = require("../model/book");
const {AuthorDbModel} = require("../model/author");

const GraphQLRootQueries = new GraphQLObjectType({
    name: "GraphQLRootQueries",
    fields: {
        book: {
            type: BookGraphQlType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return BookDbModel.findById(args.id);
            }
        },

        author: {
            type: AuthorGraphQlType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return AuthorDbModel.findById(args.id);
            }
        },

        books: {
            type: new GraphQLList(BookGraphQlType),
            resolve(parent, args) {
                return BookDbModel.find({});
            }
        },

        authors: {
            type: new GraphQLList(AuthorGraphQlType),
            resolve(parent, args) {
                return AuthorDbModel.find({});
            }
        }
    }
});

module.exports = {
    GraphQLRootQueries
};
