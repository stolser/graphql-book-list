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

const {sleep} = require("../utils/commons")

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
            async resolve(parent, args) {
                await sleep(1000);
                return BookDbModel.find({});
            }
        },

        authors: {
            type: new GraphQLList(AuthorGraphQlType),
            async resolve(parent, args) {
                await sleep(2000);
                return AuthorDbModel.find({});
            }
        }
    }
});

module.exports = {
    GraphQLRootQueries
};
